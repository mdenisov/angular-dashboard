<?php


$app->get('/users/', 'getUsersList');
$app->get('/users/page/:page', 'getUsersList');
$app->get('/users/:id', 'getUser');
$app->put('/users/:id', 'updateUser');
$app->post('/users/', 'addUser');
$app->delete('/users/:id', 'deleteUser');

function getUser($id) {
    $sql = "SELECT * FROM users WHERE id=:id";
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

function updateUser($id) {
    $request = \Slim\Slim::getInstance()->request();
    $body = $request->getBody();
    $user = json_decode($body);
    $sql = "UPDATE users SET name=:name, email=:email, role=:role WHERE id=:id";
    try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->bindParam("name", $user->name);
        $stmt->bindParam("role", $user->role);
        $stmt->bindParam("email", $user->email);
        $stmt->bindParam("id", $id);
        $stmt->execute();
        $db = null;
        echo json_encode($user);
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}

function deleteUser($id) {
    $sql = "DELETE FROM users WHERE id=:id";
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

function addUser() {
    $request = \Slim\Slim::getInstance()->request();
    $user = json_decode($request->getBody());
    $sql = "INSERT INTO users (email, name, role, photo) VALUES (:email, :name, :role, :photo)";
    try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->bindParam("email", $user->email);
        $stmt->bindParam("name", $user->name);
        $stmt->bindParam("role", $user->role);
        $stmt->bindParam("photo", $user->photo);
        $stmt->execute();
        $user->id = $db->lastInsertId();
        $db = null;
        echo json_encode($user);
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}

function getUsersList($page = 1) {
    $sql = "select * FROM users ORDER BY id";
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