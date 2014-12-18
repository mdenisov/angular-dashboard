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
        $item = $stmt->fetchObject();

        $item->banks = unserialize($item->banks);
        $item->banks_info = unserialize($item->banks_info);
        $item->illustrations = unserialize($item->illustrations);
        $item->insurance = unserialize($item->insurance);
        $item->leasing = unserialize($item->leasing);
        $item->mfo = unserialize($item->mfo);
        $item->products = unserialize($item->products);
        $item->regions = unserialize($item->regions);
        $item->rss = unserialize($item->rss);
        $item->topic = unserialize($item->topic);
        $item->video = unserialize($item->video);

        $item->title = html_entity_decode($item->title, ENT_QUOTES);
        $item->text = html_entity_decode($item->text, ENT_QUOTES);
        $item->preview_text = html_entity_decode($item->preview_text, ENT_QUOTES);

        $db = null;
        echo json_encode($item);
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}

function updateNews($id) {
    $request = \Slim\Slim::getInstance()->request();
    $body = $request->getBody();
    $news = json_decode($body);
    $sql = "UPDATE news SET active=:active, banks=:banks, banks_info=:banks_info, block=:block, correction=:correction, date_finish=DATE_FORMAT(:date_finish, '%Y-%m-%d'), date_start=DATE_FORMAT(:date_start, '%Y-%m-%d'), date_update=NOW(), illustrations=:illustrations, image=:image, insurance=:insurance, leasing=:leasing, mainnews=:mainnews, mfo=:mfo, noshowinbankcard=:noshowinbankcard, preview_text=:preview_text, products=:products, razdel_only=:razdel_only, regions=:regions, rss=:rss, source_name=:source_name, source_url=:source_url, status=:status, sub_category=:sub_category, text=:text, title=:title, topic=:topic, video=:video WHERE id=:id";
    try {
        $db = getConnection();
        $stmt = $db->prepare($sql);

        $stmt->bindParam("active", $news->active);
        $stmt->bindParam("banks", serialize($news->banks));
        $stmt->bindParam("banks_info", serialize($news->banks_info));
        $stmt->bindParam("block", $news->block);
        $stmt->bindParam("correction", $news->correction);
        $stmt->bindParam("date_finish", $news->date_finish);
        $stmt->bindParam("date_start", $news->date_start);
        $stmt->bindParam("illustrations", serialize($news->illustrations));
        $stmt->bindParam("image", $news->image);
        $stmt->bindParam("insurance", serialize($news->insurance));
        $stmt->bindParam("leasing", serialize($news->leasing));
        $stmt->bindParam("mainnews", $news->mainnews);
        $stmt->bindParam("mfo", serialize($news->mfo));
        $stmt->bindParam("noshowinbankcard", $news->noshowinbankcard);
        $stmt->bindParam("preview_text", htmlentities($news->preview_text, ENT_QUOTES));
        $stmt->bindParam("products", serialize($news->products));
        $stmt->bindParam("razdel_only", $news->razdel_only);
        $stmt->bindParam("regions", serialize($news->regions));
        $stmt->bindParam("rss", serialize($news->rss));
        $stmt->bindParam("source_name", $news->source_name);
        $stmt->bindParam("source_url", $news->source_url);
        $stmt->bindParam("status", $news->status);
        $stmt->bindParam("sub_category", $news->sub_category);
        $stmt->bindParam("text", htmlentities($news->text, ENT_QUOTES));
        $stmt->bindParam("title", htmlentities($news->title, ENT_QUOTES));
        $stmt->bindParam("topic", serialize($news->topic));
        $stmt->bindParam("video", serialize($news->video));
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
    $sql = "INSERT INTO news (active, banks, banks_info, block, correction, date_create, date_finish, date_start, date_update, illustrations, image, insurance, leasing, mainnews, mfo, noshowinbankcard, preview_text, products, razdel_only, regions, rss, source_name, source_url, status, sub_category, text, title, topic, video) VALUES (:active, :banks, :banks_info, :block, :correction, NOW(), DATE_FORMAT(:date_finish, '%Y-%m-%d'), DATE_FORMAT(:date_start, '%Y-%m-%d'), NOW(), :illustrations, :image, :insurance, :leasing, :mainnews, :mfo, :preview_text, :products, :regions, :rss, :source_name, :source_url, :status, :sub_category, :text, :title, :topic, :video)";
    try {
        $db = getConnection();
        $stmt = $db->prepare($sql);

        $stmt->bindParam("active", $news->active);
        $stmt->bindParam("banks", serialize($news->banks));
        $stmt->bindParam("banks_info", serialize($news->banks_info));
        $stmt->bindParam("block", $news->block);
        $stmt->bindParam("correction", $news->correction);
        $stmt->bindParam("date_finish", $news->date_finish);
        $stmt->bindParam("date_start", $news->date_start);
        $stmt->bindParam("illustrations", serialize($news->illustrations));
        $stmt->bindParam("image", $news->image);
        $stmt->bindParam("insurance", serialize($news->insurance));
        $stmt->bindParam("leasing", serialize($news->leasing));
        $stmt->bindParam("mainnews", $news->mainnews);
        $stmt->bindParam("mfo", serialize($news->mfo));
        $stmt->bindParam("noshowinbankcard", $news->noshowinbankcard);
        $stmt->bindParam("preview_text", htmlentities($news->preview_text, ENT_QUOTES));
        $stmt->bindParam("products", serialize($news->products));
        $stmt->bindParam("razdel_only", $news->razdel_only);
        $stmt->bindParam("regions", serialize($news->regions));
        $stmt->bindParam("rss", serialize($news->rss));
        $stmt->bindParam("source_name", $news->source_name);
        $stmt->bindParam("source_url", $news->source_url);
        $stmt->bindParam("status", $news->status);
        $stmt->bindParam("sub_category", $news->sub_category);
        $stmt->bindParam("text", htmlentities($news->text, ENT_QUOTES));
        $stmt->bindParam("title", htmlentities($news->title, ENT_QUOTES));
        $stmt->bindParam("topic", serialize($news->topic));
        $stmt->bindParam("video", serialize($news->video));

        $stmt->execute();
        $news->id = $db->lastInsertId();
        $db = null;
        echo json_encode($news);
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}

/**
 * @param int $page
 */
function getNewsList($page = 1) {
    $sql = "SELECT * FROM news ORDER BY id DESC";
    try {
        $db = getConnection();
        $stmt = $db->query($sql);
        $news = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;

        foreach($news as $item) {
            $item->banks = unserialize($item->banks);
            $item->banks_info = unserialize($item->banks_info);
            $item->illustrations = unserialize($item->illustrations);
            $item->insurance = unserialize($item->insurance);
            $item->leasing = unserialize($item->leasing);
            $item->mfo = unserialize($item->mfo);
            $item->products = unserialize($item->products);
            $item->regions = unserialize($item->regions);
            $item->rss = unserialize($item->rss);
            $item->topic = unserialize($item->topic);
            $item->video = unserialize($item->video);

            $item->title = html_entity_decode($item->title, ENT_QUOTES);
            $item->text = html_entity_decode($item->text, ENT_QUOTES);
            $item->preview_text = html_entity_decode($item->preview_text, ENT_QUOTES);
        }

        echo json_encode($news);
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}

?>