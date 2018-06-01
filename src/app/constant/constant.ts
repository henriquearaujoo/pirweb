export const Constant = {
    //  BASE_URL : 'http://10.10.3.88:8080/pir/rest/',
    BASE_URL : localStorage.getItem('server') ?
               localStorage.getItem('server') :
               'http://10.10.3.85:8080/pir/rest/',
            //    'http://samsung.institutoitn.com.br/pir-dev/rest/',
            // 'http://10.10.3.148:8080/pir/rest/',
            // 'http://localhost:8080/pir/rest/',
            // 'http://192.168.0.5:8080/pir/rest/',
    // BASE_URL : 'http://localhost:3000/',
    MEDIA_TYPE:
        {
            PICTURE_2D: 'PICTURE_2D',
            PICTURE_360: 'PICTURE_360',
            VIDEO_2D: 'VIDEO_2D',
            VIDEO_360: 'VIDEO_360',
            FILE: 'FILE'
        },
       LIMIT_CHARACTERS: 3000
};
