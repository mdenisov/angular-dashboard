<?php

    if ( !empty( $_FILES ) ) {
        $tempPath = $_FILES[ 'file' ][ 'tmp_name' ];$uploadPath =  dirname( __FILE__ ) . DIRECTORY_SEPARATOR . 'uploads' . DIRECTORY_SEPARATOR . $_FILES[ 'file' ][ 'name' ];
        move_uploaded_file( $tempPath, $uploadPath );
        $answer = array( 'file' => DIRECTORY_SEPARATOR . 'uploads' . DIRECTORY_SEPARATOR . $_FILES[ 'file' ][ 'name' ] );
        $json = json_encode( $answer );
        echo $json;
    } else {
        echo 'No files';
    }

?>