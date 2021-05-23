let request = indexedDB.open("camera", 1);
let db;


request.onsuccess = (e) => {
    db = request.result;
}

request.onerror = (err) => {
    console.log(err);
}
request.onupgradeneeded = (e) => {
    db = request.result;
    db.createObjectStore("images", {
        keyPath: "mid"
    });
    db.createObjectStore("video", {
        keyPath: "mid"
    });

}


function addMediaToDb(url, table) {
    if (db) {
        if (table === "images") {
            let tnx = db.transaction(table, "readwrite");
            let store = tnx.objectStore(table);
            store.add({
                mid: Date.now(),
                media: url
            })
        } else if (table === "video") {
            let tnx = db.transaction(table, "readwrite");
            let store = tnx.objectStore(table);
            store.add({
                mid: Date.now(),
                media: url
            })
        }
    } else {
        alert("DB loading");
    }


}