<?php


$app->get('/news/', 'getNewsList');
$app->get('/news/page/:page', 'getNewsList');
$app->get('/news/:id', 'getNews');
$app->put('/news/:id', 'updateNews');
$app->post('/news/', 'addNews');
$app->delete('/news/:id', 'deleteNews');

function getNews($id) {
    $sql = "SELECT * FROM news WHERE id=:id";
    try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->bindParam("id", $id);
        $stmt->execute();
        $user = $stmt->fetchObject();
        $db = null;
        echo json_encode($user);
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}

function updateNews($id) {
    $request = \Slim\Slim::getInstance()->request();
    $body = $request->getBody();
    $user = json_decode($body);
    $sql = "UPDATE news SET title=:title, active=:active, correction=:correction, status=:status, date_start=DATE_FORMAT(:date_start, '%Y-%m-%d'), date_finish=DATE_FORMAT(:date_finish, '%Y-%m-%d'), text=:text WHERE id=:id";
    try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->bindParam("title", $user->title);
        $stmt->bindParam("active", $user->active);
        $stmt->bindParam("correction", $user->correction);
        $stmt->bindParam("status", $user->status);
        $stmt->bindParam("date_start", $user->date_start);
        $stmt->bindParam("date_finish", $user->date_finish);
        $stmt->bindParam("text", $user->text);
        $stmt->bindParam("id", $id);
        $stmt->execute();
        $db = null;
        echo json_encode($user);
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}

function deleteNews($id) {
    $sql = "DELETE FROM news WHERE id=:id";
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

function addNews() {
    $request = \Slim\Slim::getInstance()->request();
    $user = json_decode($request->getBody());
    $sql = "INSERT INTO news (title, active, correction, status, date_start, date_finish, text) VALUES (:title, :active, :correction, :status, STR_TO_DATE(:date_start, '%Y/%m/%d'), STR_TO_DATE(:date_finish, '%Y/%m/%d'), :text)";
    try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->bindParam("title", $user->title);
        $stmt->bindParam("active", $user->active);
        $stmt->bindParam("correction", $user->correction);
        $stmt->bindParam("status", $user->status);
        $stmt->bindParam("date_start", $user->date_start);
        $stmt->bindParam("date_finish", $user->date_finish);
        $stmt->bindParam("text", $user->text);
        $stmt->execute();
        $user->id = $db->lastInsertId();
        $db = null;
        echo json_encode($user);
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}

function getNewsList($page = 1) {
    $sql = "select * FROM news ORDER BY id";
    try {
        $db = getConnection();
        $stmt = $db->query($sql);
        $users = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;
        echo json_encode($users);
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}

?>