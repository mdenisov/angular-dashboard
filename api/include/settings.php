<?php


$app->get('/settings/', 'getSettingsList');
$app->get('/settings/:id', 'getSettings');
$app->put('/settings/:id', 'updateSettings');

function getSettings($id) {
    $sql = "SELECT * FROM settings WHERE id=:id";
    try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->bindParam("id", $id);
        $stmt->execute();
        $settings = $stmt->fetchObject();
        $db = null;
        echo json_encode($settings);
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}

function updateSettings($id) {
    $request = \Slim\Slim::getInstance()->request();
    $body = $request->getBody();
    $settings = json_decode($body);
    $sql = "UPDATE settings SET host_id=:host_id WHERE id=:id";
    try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->bindParam("host_id", $settings->host_id);
        $stmt->bindParam("id", $id);
        $stmt->execute();
        $db = null;
        echo json_encode($settings);
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}

function getSettingsList($page = 1) {
    $sql = "select * FROM settings ORDER BY id DESC";
    try {
        $db = getConnection();
        $stmt = $db->query($sql);
        $settings = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;

        foreach($settings as $item) {
            $item->title = html_entity_decode($item->title, ENT_QUOTES);
        }

        echo json_encode($settings);
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}

?>