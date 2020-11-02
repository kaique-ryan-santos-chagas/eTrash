const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

module.exports = {

    dest: path.resolve(__dirname,'..','..','temp','uploads','points'),
    
    storage: multer.diskStorage({
        
        destination: (req, file, cb) =>{
            cb(null, path.resolve(__dirname,'..','..','temp','uploads','points'));
        },

        filename: (req, file, cb) => {
            crypto.randomBytes(16, (err, hash)=> {
                if(err) cb(err);

                const fileName = `${hash.toString('hex')}-${file.originalname}`;

                cb(null,fileName);
            });
        }
    }),

    limits:{
        filesize: 10 * 1024 * 1024,
    },

    fileFilter: (req, file, cb) =>{
        const allowedMimmes = [
            'image/jpeg',
            'image/pjpeg',
            'image/png',
            'image/gif'
        ];

        if(allowedMimmes.includes(file.mimetype)){
            cb(null, true);
        }else{
            cb(new Error('Extensão de arquivo inválida.'));
        }

    },
};