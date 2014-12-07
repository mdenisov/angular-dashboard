<?php


$app->get('/topic/', 'getTopicsList');
$app->get('/topic/page/:page', 'getTopicsList');
$app->get('/topic/:id', 'getTopic');
$app->put('/topic/:id', 'updateTopic');
$app->post('/topic/', 'addTopic');
$app->delete('/topic/:id', 'deleteTopic');

function getTopic($id) {
    $sql = "SELECT * FROM topics WHERE id=:id";
    try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->bindParam("id", $id);
        $stmt->execute();
        $topic = $stmt->fetchObject();
        $topic->title = html_entity_decode($topic->title, ENT_QUOTES);
        $topic->text = html_entity_decode($topic->text, ENT_QUOTES);
        $db = null;
        echo json_encode($topic);
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}

function updateTopic($id) {
    $request = \Slim\Slim::getInstance()->request();
    $body = $request->getBody();
    $topic = json_decode($body);
    $sql = "UPDATE topics SET title=:title, active=:active, show_in_block=:show_in_block, text=:text, date_update=NOW(), image=:image WHERE id=:id";
    try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->bindParam("title", htmlentities($topic->title, ENT_QUOTES));
        $stmt->bindParam("active", $topic->active);
        $stmt->bindParam("show_in_block", $topic->show_in_block);
        $stmt->bindParam("text", htmlentities($topic->text, ENT_QUOTES));
        $stmt->bindParam("image", $topic->image);
        $stmt->bindParam("id", $id);
        $stmt->execute();
        $db = null;
        echo json_encode($topic);
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}

function deleteTopic($id) {
    $sql = "DELETE FROM topics WHERE id=:id";
    try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->bindParam("id", $id);
        $stmt->execute();
        $db = null;
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}

function addTopic() {
    $request = \Slim\Slim::getInstance()->request();
    $topic = json_decode($request->getBody());
    $sql = "INSERT INTO topics (title, active, show_in_block, text, date_create, image) VALUES (:title, :active, :show_in_block, :text, NOW(), :image)";
    try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->bindParam("title", htmlentities($topic->title, ENT_QUOTES));
        $stmt->bindParam("active", $topic->active);
        $stmt->bindParam("show_in_block", $topic->show_in_block);
        $stmt->bindParam("text", htmlentities($topic->text, ENT_QUOTES));
        $stmt->bindParam("image", $topic->image);
        $stmt->execute();
        $topic->id = $db->lastInsertId();
        $db = null;
        echo json_encode($topic);
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}

function getTopicsList($page = 1) {
    $sql = "select * FROM topics ORDER BY id DESC";
    try {
        $db = getConnection();
        $stmt = $db->query($sql);
        $topic = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;

        foreach($topic as $item) {
            $item->title = html_entity_decode($item->title, ENT_QUOTES);
        }

        echo json_encode($topic);
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}

?>