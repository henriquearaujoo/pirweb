export const Constant = {
    //  BASE_URL : 'http://10.10.3.85:8080/pir/rest/',
    BASE_URL : localStorage.getItem('server') ?
               localStorage.getItem('server') :

                // 'http://localhost:3000/',
                // 'http://10.10.2.181:8080/pir/rest/',
                'http://10.10.3.146:8080/pir/rest/',

            //    'http://samsung.institutoitn.com.br/pir-dev/rest/',
            // 'http://10.10.3.148:8080/pir/rest/',
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
    LIMIT_CHARACTERS: 6000,
    PROP_VALUE: {
        'null' : '<sem valor>',
        'true': 'sim',
        'false': 'não',
        '': '<sem valor>',
        'OBJECTIVE': 'Objetiva',
        'SUBJECTIVE': 'Subjetiva',
        'DISSERTATIVE': 'Dissertativa',
        'UNDEFINED': 'Não definido',
        'WEB': 'Web',
        'MOBILE': 'App',
        'FAMALE': 'Feminino',
        'MALE': 'Masculino',
        'MARRIED': 'Casado(a)',
        'SINGLE': 'Solteiro(a)',
        'SEPARATED': 'Divorciado (a)',
        'WIDOWED': 'Viúvo(a)',
        'RURAL': 'Rural',
        'URBAN': 'Urbana',
        'AFFECTIVE': 'Sócio afetiva',
        'MOTOR': 'Motora',
        'LANGUAGE': 'Comunicação e Linguagem',
        'COGNITIVE': 'Cognitiva',
        'NEURO': 'Neuro',
        'BTYPE': 'Presente/ Ausente',
        'ATYPE': 'Dimensão',
        'OWNED': 'Própria',
        'LEASED': 'Alugada',
        'CEDED': 'Cedida',
        'PICTURE2D': 'Imagem 2D',
        'PICTURE360': 'Imagem 3D',
        'VIDEO2D': 'Video 2D',
        'VIDEO360': 'Video 3D',
        'FILE': 'Arquivos',
        'ADMIN': 'Administrador',
        'AGENT': 'Agente',
        'OTHER': 'Outro',
        'PFIS': 'Pessoa física',
        'PJUR': 'Pessoa jurídica'
    }
};
