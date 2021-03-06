const container = document.querySelector('#container');
const fileInput = document.querySelector('#file-input');
const listUsername = sessionStorage.getItem('labels').split(',')
const ClassID = sessionStorage.getItem('ClassID')

async function loadTrainingData() {
	const labels = listUsername // fetch ds student về lấy ra mảng bỏ vào label 

	const faceDescriptors = []
	for (const label of labels) {
		const descriptors = []
		for (let i = 1; i <= 3; i++)
		{
			const image = await faceapi.fetchImage(`${getImgApi}/${label}-${i}.jpg`)
			const detection = await faceapi.detectSingleFace(image).withFaceLandmarks().withFaceDescriptor()
			descriptors.push(detection.descriptor)
		}
		faceDescriptors.push(new faceapi.LabeledFaceDescriptors(label, descriptors))
	}

	return faceDescriptors
}

let faceMatcher
async function init() {
	await Promise.all([
		faceapi.loadSsdMobilenetv1Model('/models'),
		faceapi.loadFaceRecognitionModel('/models'),
		faceapi.loadFaceLandmarkModel('/models'),
	])

	const trainingData = await loadTrainingData()
	faceMatcher = new faceapi.FaceMatcher(trainingData, 0.5)

	document.querySelector("#loading").remove();
}

init()

fileInput.addEventListener('change', async () => {
	if(document.getElementById('detecting') != null) {
		document.getElementById('detecting').remove()
	}
	var p = document.createElement("p");
	p.innerHTML = 'Đang xử lí vui lòng đợi ...loading'
	p.id = 'detecting'
	p.style.cssText = 'font-size: 1.6rem; font-weight = 500; color : var(--primary-color);'
	document.getElementById('face-detect').appendChild(p)

	

	const files = fileInput.files;

	const image = await faceapi.bufferToImage(files[0]);

	const size = {
		width: image.width,
		height: image.height
	}


	const detections = await faceapi.detectAllFaces(image).withFaceLandmarks().withFaceDescriptors()
	const resizedDetections = faceapi.resizeResults(detections, size)

	var listDetect = []

	for (const detection of resizedDetections) {
		var label = faceMatcher.findBestMatch(detection.descriptor).label.toString()
		if(label != "unknown") listDetect.push(label)
	}

	sessionStorage.setItem('listDetectDone', listDetect)

	console.log(listDetect)

	listDetect.forEach(element => {
		document.getElementById(element + '-check2').checked = true
	})
	
	setTimeout(() => {
		document.getElementById('detecting').innerHTML = 'Đã xong'
	}, 1000)
})