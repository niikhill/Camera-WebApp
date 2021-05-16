let constraints = {
    video: true,
    audio: true
};
let recordBtn = document.querySelector("#recorder")
let vidElement = document.querySelector("#video-player");
let mediaRecorder;
let recordState = false;
let buffer = [];


(async () => {
    try {
        let mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
        vidElement.srcObject = mediaStream;
        mediaRecorder = await new MediaRecorder(mediaStream);

        mediaRecorder.addEventListener("dataavailable", (e) => {
            buffer.push(e.data);
        })
        mediaRecorder.addEventListener("stop", (e) => {
            //mine type
            let blob = new Blob(buffer, {
                type: "video/mp4"
            });
            const url = window.URL.createObjectURL(blob);
            let a = document.createElement("a");
            a.download = "file.mp4"
            a.href = url;
            a.click();
        })
    } catch (err) {
        console.log(err);
    }

})();


recordBtn.addEventListener("click", () => {
    if (!mediaRecorder) {
        alert("Enable Permissions")
    }
    if (recordState == false) {
        mediaRecorder.start();
        recordBtn.innerHTML = "Recording...."
        recordState = true;
    } else {
        mediaRecorder.stop();
        recordBtn.innerHTML = "Record"
        recordState = false;
    }
})























// navigator.mediaDevices
//     .getUserMedia(constraints)
//     .then((mediaStream) => {
//         mediaRecorder = new MediaRecorder(mediaStream);
//         mediaRecorder.addEventListener("dataavailable", (e) => {
//             buffer.push(e.data);
//         })
//         mediaRecorder.addEventListener("stop", (e) => {
//             //mine type
//             let blob = new Blob(buffer, {
//                 type: "video/mp4"
//             });
//             const url = window.URL.createObjectURL(blob);
//             let a = document.createElement("a");
//             a.download = "file.mp4"
//             a.href = url;
//             a.click();
//         })
//     }).catch((err) => {
//         console.log(err);
//     })

;