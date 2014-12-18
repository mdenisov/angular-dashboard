<?php

    $uploadDir = dirname( __FILE__ ) . DIRECTORY_SEPARATOR . 'uploads' . DIRECTORY_SEPARATOR;

    if ( !empty( $_FILES ) ) {

        $response = array(
            'status' => 'success',
            'files' => array()
        );
        $tempPaths = $_FILES[ 'file' ][ 'tmp_name' ];
        $tempNames = $_FILES[ 'file' ][ 'name' ];

        if (is_array($tempNames)) {
            foreach($tempPaths as $index => $file) {
                $fileName = strtolower(uniqid() . '.' . pathinfo($tempNames[$index], PATHINFO_EXTENSION));
                $uploadPath =  $uploadDir . $fileName;

                move_uploaded_file( $file, $uploadPath );

                $response['files'][] = DIRECTORY_SEPARATOR . 'uploads' . DIRECTORY_SEPARATOR . $fileName;
            }
        } else {
            $fileName = strtolower(uniqid() . '.' . pathinfo($tempNames, PATHINFO_EXTENSION));
            $uploadPath =  $uploadDir . $fileName;

            move_uploaded_file( $tempPaths, $uploadPath );

            $response['files'][] = DIRECTORY_SEPARATOR . 'uploads' . DIRECTORY_SEPARATOR . $fileName;
        }

        $json = json_encode( $response );
        echo $json;
    } else {
        echo 'No files';
    }

?>