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
        $news = $stmt->fetchObject();
        $db = null;
        echo json_encode($news);
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}

function updateNews($id) {
    $request = \Slim\Slim::getInstance()->request();
    $body = $request->getBody();
    $news = json_decode($body);
    $sql = "UPDATE news SET title=:title, active=:active, block=:block, mainnews=:mainnews, correction=:correction, status=:status, date_start=DATE_FORMAT(:date_start, '%Y-%m-%d'), date_finish=DATE_FORMAT(:date_finish, '%Y-%m-%d'), preview_text=:preview_text, text=:text WHERE id=:id";
    try {
        $active = $news->active ? 1 : 0;
        $block = $news->block ? 1 : 0;
        $mainnews = $news->mainnews ? 1 : 0;
        $correction = $news->correction ? 1 : 0;

        $db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->bindParam("title", $news->title);
        $stmt->bindParam("active", $active);
        $stmt->bindParam("block", $block);
        $stmt->bindParam("mainnews", $mainnews);
        $stmt->bindParam("correction", $correction);
        $stmt->bindParam("status", $news->status);
        $stmt->bindParam("date_start", $news->date_start);
        $stmt->bindParam("date_finish", $news->date_finish);
        $stmt->bindParam("preview_text", $news->preview_text);
        $stmt->bindParam("text", $news->text);
        $stmt->bindParam("id", $id);
        $stmt->execute();
        $db = null;
        echo json_encode($news);
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
    $news = json_decode($request->getBody());
    $sql = "INSERT INTO news (title, active, mainnews, correction, status, date_start, date_finish, preview_text, text) VALUES (:title, :active, :mainnews, :correction, :status, STR_TO_DATE(:date_start, '%Y/%m/%d'), STR_TO_DATE(:date_finish, '%Y/%m/%d'), :preview_text, :text)";
    try {
        $active = $news->active ? 1 : 0;
//        $block = $news->block ? 1 : 0;
        $mainnews = $news->mainnews ? 1 : 0;
        $correction = $news->correction ? 1 : 0;

        $db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->bindParam("title", $news->title);
        $stmt->bindParam("active", $news->active);
//        $stmt->bindParam("block", $news->block);
        $stmt->bindParam("mainnews", $news->mainnews);
        $stmt->bindParam("correction", $news->correction);
        $stmt->bindParam("status", $news->status);
        $stmt->bindParam("date_start", $news->date_start);
        $stmt->bindParam("date_finish", $news->date_finish);
        $stmt->bindParam("preview_text", $news->preview_text);
        $stmt->bindParam("text", $news->text);
        $stmt->execute();
        $news->id = $db->lastInsertId();
        $db = null;
        echo json_encode($news);
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}

function getNewsList($page = 1) {
    $sql = "select * FROM news ORDER BY id DESC";
    try {
        $db = getConnection();
        $stmt = $db->query($sql);
        $news = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;
        echo json_encode($news);
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}

?>