//configure multer for image upload
var multer = require("multer");
var storage = multer.diskStorage({
    destination: function(req, file, callback){
        callback(null, "./tmp")
    },
    allowedFormats: ["jpg", "png", "jpeg", "gif", "tif"],
    filename: function(req, file, callback){
        callback(null, Date.now() + file.originalname);
    }
});

var upload = multer({storage: storage}); //fileFilter: imageFilter

//configure cloudinary
var cloudinary = require("cloudinary");
cloudinary.config({ 
    cloud_name: "pawtal", 
    api_key: "264442116924278", 
    api_secret: process.env.CLOUDINARY_API_SECRET
});
// var imageFilter = function (req, file, cb) {
//     // accept image files only
//     if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
//         return cb(new Error("Only image files are allowed!"), false);
//     }
//     cb(null, true);
// };

function cropImage(image){
    var filename = image.split("/").pop();
    return cloudinary.url(filename, { width: 500, height: 500, crop: "fill" });
}

function destroyFromCloudinary(image){
    var filename = image.split("/").pop();
    var publicId = filename.split(".").shift();
    cloudinary.uploader.destroy(publicId, function(err, result){
        if(err){
            console.log(err);
        } else {
        }
    });
}

module.exports = {
    upload: upload,
    cloudinary: cloudinary,
    cropImage: cropImage,
    destroyFromCloudinary: destroyFromCloudinary
}