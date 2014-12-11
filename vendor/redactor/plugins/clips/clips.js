if (!RedactorPlugins) var RedactorPlugins = {};

RedactorPlugins.clips = function()
{
	return {
		attr: {},
		selectedClip: null,
		options: {
			className: "clip",
			clips: [
				{
					name: 'clip_twitter',
					nameRu: 'Твиттер',
					template: '<div class="control-group"><label>Положение</label><label class="radio inline"><input type="radio" name="position" value="left" checked> Слева</label><label class="radio inline"><input type="radio" name="position" value="right"> Справа</label></div><div class="control-group"><label>Автор</label><input name="author" type="text" value="" class="form-control" required></div><div class="control-group"><label>Ссылка</label><input name="link" type="text" class="form-control"></div><div class="control-group"><label>Текст</label><textarea name="text" class="form-control" rows="3" required></textarea></div>'
				},
				{
					name: 'clip_news',
					nameRu: 'Новость',
					template: '<div class="control-group"><label>Положение</label><label class="radio inline"><input type="radio" name="position" value="left" checked> Слева</label><label class="radio inline"><input type="radio" name="position" value="right"> Справа</label></div><div class="control-group"><label>ID новости</label><input name="news" type="text" value="" class="form-control" required></div>'
				},
				{
					name: 'clip_quote',
					nameRu: 'Цитата',
					template: '<form role="form"><div class="control-group"><label>Автор</label><input name="author" type="text" class="form-control" required></div><div class="control-group"><label>Ссылка</label><input name="link" type="text" class="form-control"></div><div class="control-group"><label>Текст</label><textarea name="text" class="form-control" rows="3" required></textarea></div><div class="control-group"><label>Размер</label><label class="radio inline"><input type="radio" name="size" value="medium" checked> Средний</label><label class="radio inline"><input type="radio" name="size" value="big"> Крупный</label></div></form>'
				},
				{
					name: 'clip_question',
					nameRu: 'Вопрос',
					template: '<div class="control-group"><label>Текст</label><textarea name="text" class="form-control" rows="3" required></textarea></div>'
				}
			]
		},
		init: function()
		{
//			this.clips.options.clip = this.$element.data('clips');

			var dropdown = {};

			if (this.clips.options.clips.length) {
				var items = this.clips.options.clips,
					length = items.length;

				while (length--) {
					var clip = items[length];

					dropdown[clip.name] = { title: clip.nameRu, func: this.clips.configClip };

					this.modal.addTemplate(clip.name, '<form role="form" class="clips-form">' + clip.template + '</form>');
				}
			}

			var button = this.button.add('clips', 'Врезки');
			//this.button.setAwesome('clips', 'fa-reorder');

			this.button.addDropdown(button, dropdown);

			this.clips._removeHelperElement = document.createElement('span');

//			if ( this.utils.browser('mozilla') ) {
				this.clips.initKeyMap();
				this.clips.initListeners();
//			}
		},
		configClip: function(placeholder)
		{
			this.modal.load(placeholder, 'Добавление врезки', 400);
			this.modal.createCancelButton();

			var button = this.modal.createActionButton('Вставить');
			button.on('click', $.proxy(function(e) {

				var $modal = this.modal.getModal(),
					$form = $modal.prevObject.find('form');

				if (this.clips._validate($form)) {
					this.clips.formToObject($form);
					this.clips.addClip(placeholder);
				}

			}, this));

			this.selection.save();
			this.modal.show();
		},
		editClip: function(placeholder)
		{
			var name = this.clips.selectedClip.text();

			this.modal.load(placeholder, name, 400);

			var button1 = this.modal.createDeleteButton(this.lang.get('_delete'));
			button1.on('click', $.proxy(function(e) {

				this.clips.selectedClip.remove();

				this.modal.close();
				this.code.sync();
				this.selection.restore();

			}, this));

			var button2 = this.modal.createActionButton(this.lang.get('save'));
			button2.on('click', $.proxy(function(e) {

				var $modal = this.modal.getModal(),
					$form = $modal.prevObject.find('form');

				if (this.clips._validate($form)) {
					this.clips.formToObject($form);
					this.clips.setClip();
					this.clips.selectedClip = undefined;
					this.modal.close();
					this.code.sync();
					this.selection.restore();
				}

			}, this));

			this.selection.save();
			this.modal.show();
		},
		formToObject: function($form)
		{
			this.clips.attr = {};

			$.each($form.serializeArray(), $.proxy(function(index, item) {
				this.clips.attr[item.name] = item.value;
			}, this));

			return this.clips.attr;
		},
		objectToAttr: function(object)
		{
			var attr = '';

			$.each(object, $.proxy(function(name, value) {
				attr += ' data-' + name + '="' + value + '"';
			}, this));

			return attr;
		},
		objectToDataAttr: function(object)
		{
			var attr = {};

			$.each(object, $.proxy(function(name, value) {
				attr['data-' + name] = value;
			}, this));

			return attr;
		},
		setForm: function($form)
		{
			if (this.clips.selectedClip === null) {
				return;
			}

			$.each(this.clips.selectedClip.data(), $.proxy(function(name, value) {
				$form.find('[name="'+ name +'"]').not(':radio').val(value);
				$form.find('input:radio[name="'+ name +'"][value="'+ value +'"]').attr('checked', true);
			}, this));
		},
		setClip: function()
		{
			if (this.clips.selectedClip === null) {
				return;
			}

			this.clips.selectedClip.attr(this.clips.objectToDataAttr(this.clips.attr));
			this.clips.selectedClip.data(this.clips.attr);
		},
		addClip: function(placeholder)
		{
			switch (placeholder) {
				case 'clip_twitter':
					var clip = this.clips.getClipHTML('clip_twitter', 'Твиттер');
					return this.clips.insertClip(clip);
				case 'clip_news':
					var clip = this.clips.getClipHTML('clip_news', 'Новость');
					return this.clips.insertClip(clip);
				case 'clip_quote':
					var clip = this.clips.getClipHTML('clip_quote', 'Цитата');
					return this.clips.insertClip(clip);
				case 'clip_question':
					var clip = this.clips.getClipHTML('clip_question', 'Вопрос');
					return this.clips.insertClip(clip);
			}
		},
		insertClip: function(clip)
		{
			return this.clips.insert(clip);
		},
		getClipHTML: function ( name, value )
		{
			var attr = this.clips.objectToAttr(this.clips.attr);

			return '<span class="' + this.clips.options.className + '" contenteditable="false" data-name="' + name + '" ' + attr + '>' + value + '</span>';
		},
		insert: function(html)
		{
			this.selection.restore();
			this.modal.close();

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
					this.clips._backspacePolyfill( event );
			}, this);

			return this;
		},
		initListeners: function()
		{
			this.core.getEditor().on('click', '.' + this.clips.options.className, $.proxy(function(e)
			{
				e.preventDefault();

				var $clip = this.clips.selectedClip = $(e.currentTarget);

				this.clips.editClip($clip.data('name'));

				var $modal = this.$modal,
					$form = $modal.find('form');

				this.clips.setForm($form);

			}, this));
		},
		_backspacePolyfill: function ( event ) {
			var $helper_element, $prev, nodeType;

			this.insert.node(this.clips._removeHelperElement);

			$helper_element = $(this.clips._removeHelperElement);

			// Get previous_sibling to delete
			$prev = $(this.clips._removeHelperElement.previousSibling);
			nodeType = $prev.get(0) ? $prev.get(0).nodeType : null;

			// Previous sibling exists and its an element
			if ( $prev.get(0) ) {
				if (
				// element is a placeholder
					( nodeType == 1 && $prev.hasClass(this.clips.options.className) ) ||
						// element's parent is a placeholder
						( nodeType == 3 && ( $prev = $prev.parent() ).hasClass(this.clips.options.className) )
					) {
					event.preventDefault();
					$prev.remove();
				}
			}

			$helper_element.detach();
		},
		_validate: function($form) {

			var noErrors = true,
				$fields = $form.find('[required]');

			$fields.each($.proxy(function(index, field) {
				var $field = $(field),
					$formGroup = $field.parents('.control-group');

				$formGroup.removeClass('error');

				if ($field.val().trim().length === 0) {
					$formGroup.addClass('error');
					noErrors = false;
				}
			}));

			return noErrors;
		}
	};
};