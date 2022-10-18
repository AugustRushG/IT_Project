const multer = require('multer');

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"uploads");
    },
    filename:function(req,file,cb){
        //const ext = file.mimetype.split('/')[1];
        //callback(null,file.filename+'-'+Date.now()+ext)
        cb(null,file.originalname);
    }
})


const isImage = (req,file,callback) => {
    if(file.mimetype.split('/')[0] == 'image'){
        callback(null,true);
    } else {
        callback(new Error('Only image is Allowed.'));
    }
};

const upload = multer({
    storage:storage,
    fileFilter:isImage
});

module.exports = upload;