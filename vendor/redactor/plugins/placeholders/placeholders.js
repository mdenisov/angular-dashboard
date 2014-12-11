if (!RedactorPlugins) var RedactorPlugins = {};

RedactorPlugins.placeholders = function()
{
	return {
		options: {
			className: "placeholder",
			placeholder: ""
		},
		init: function()
		{
			this.placeholders.options.placeholder = this.$element.data('placeholders').placeholders;

			var dropdown = {};

			if (this.placeholders.options.placeholder.length) {
				var items = this.placeholders.options.placeholder,
					length = items.length;

				while (length--) {
					var pl = items[length];

					dropdown[pl.name] = { title: pl.value, func: this.placeholders.addPlaceholder };
				}
			}

			this.placeholders.replacePlaceholders();

			var button = this.button.add('placeholders', 'Иллюстрации');
			this.button.setAwesome('placeholders', 'fa-image');

			this.button.addDropdown(button, dropdown);

			this.placeholders._removeHelperElement = document.createElement('span');

//			if ( this.utils.browser('mozilla') ) {
				this.placeholders.initKeyMap();
//			}
		},
		addPlaceholder: function(placeholder)
		{
			switch (placeholder) {
				case 'placeholder_gallery':
					return this.placeholders.buildGalleryPlaceholder();
			}
		},
		buildGalleryPlaceholder: function()
		{
			return this.placeholders.insert(this.placeholders.getPlaceholderHTML('placeholder_gallery', 'Иллюстрации'));
		},
		getPlaceholderHTML: function ( name, value )
		{
			return '<span class="' + this.placeholders.options.className + '" contenteditable="false" name="' + name + '" data-name="' + name + '">' + value + '</span>';
		},
		insert: function(html)
		{
			this.selection.restore();

			var current = this.selection.getBlock() || this.selection.getCurrent();

			if (current)
			{
				$(current).after(html);
			}
			else
			{
				this.insert.html(html);
			}

			this.code.sync();
		},
		replacePlaceholders: function()
		{

		},
		initKeyMap: function()
		{
			var original;

			// Save existing callback
			original = this.opts.keydownCallback;

			// Register keydown callback
			this.opts.keydownCallback = $.proxy(function ( event ) {
				// Run existing callback first
				if ( typeof original === 'function' )
					original( event );

				// Backspace polyfill
				if ( event.keyCode == 8 && !this.selection.get() )
					this.placeholders._backspacePolyfill( event );
			}, this);

			return this;
		},

		_backspacePolyfill: function ( event ) {
			var $helper_element, $prev, nodeType;

			this.insert.node(this.placeholders._removeHelperElement);

			$helper_element = $(this.placeholders._removeHelperElement);

			// Get previous_sibling to delete
			$prev = $(this.placeholders._removeHelperElement.previousSibling);
			nodeType = $prev.get(0) ? $prev.get(0).nodeType : null;

			// Previous sibling exists and its an element
			if ( $prev.get(0) ) {
				if (
				// element is a placeholder
					( nodeType == 1 && $prev.hasClass(this.placeholders.options.className) ) ||
						// element's parent is a placeholder
						( nodeType == 3 && ( $prev = $prev.parent() ).hasClass(this.placeholders.options.className) )
					) {
					event.preventDefault();
					$prev.remove();
				}
			}

			$helper_element.detach();
		},
	};
};