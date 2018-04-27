export const MENU = [

    {
        'id': 1,
        'title': 'USUÁRIO',
        'route': '',
        'routes': ['/', '/user-list', '/user', '/details', '/profile-list'],
        'read': false,
        'iClass': 'fa fa-user',
        'category': 'parent',
        'hasChild': true,
        'parent': 0
    },
    {
        'id': 2,
        'title': 'REGISTRO',
        'route': 'user-list',
        'routes': ['/user-list', '/user', '/details'],
        'read': false,
        'iClass': 'fa fa-circle-o',
        'category': 'child',
        'hasChild': false,
        'parent': 1
    },
    {
        'id': 3,
        'title': 'PERFIL',
        'route': 'profile-list',
        'routes': ['/profile-list'],
        'read': false,
        'iClass': 'fa fa-circle-o',
        'category': 'child',
        'hasChild': false,
        'parent': 1
    },
    {
        'id': 4,
        'title': 'LIVRO',
        'route': '',
        'routes': ['/', '/chapter', '/chapter-dashboard'],
        'read': false,
        'iClass': 'fa fa-file-text',
        'category': 'parent',
        'hasChild': true,
        'parent': 0
    },
    {
        'id': 5,
        'title': 'CAPÍTULOS',
        'route': 'chapter',
        'routes': ['/chapter', '/chapter-dashboard'],
        'read': false,
        'iClass': 'fa fa-circle-o',
        'category': 'child',
        'hasChild': false,
        'parent': 4
    },
    {
        'id': 6,
        'title': 'AGENTE',
        'route': '',
        'routes': ['/', '/agent-information', '/agent-list', '/agent', '/details', '/location',
                   '/agent-visit', '/family-list', '/history-list', '/agent-performance', '/agents-map'],
        'read': false,
        'iClass': 'fa fa-user',
        'category': 'parent',
        'hasChild': true,
        'parent': 0
    },
    {
        'id': 7,
        'title': 'REGISTRO',
        'route': 'agent-information',
        'routes': ['agent-information', '/agent-list', '/agent', '/details', '/location'],
        'read': false,
        'iClass': 'fa fa-circle-o',
        'category': 'child',
        'hasChild': false,
        'parent': 6
    },
    {
        'id': 8,
        'title': 'HISTÓRICO DE VISITAS',
        'route': 'agent-visit',
        'routes': ['/agent-visit', '/family-list', '/history-list'],
        'read': false,
        'iClass': 'fa fa-circle-o',
        'category': 'child',
        'hasChild': false,
        'parent': 6
    },
    {
        'id': 9,
        'title': 'GRÁFICO DE DESEMPENHO',
        'route': 'agent-performance',
        'routes': ['/agent-performance'],
        'read': true,
        'iClass': 'fa fa-circle-o',
        'category': 'child',
        'hasChild': false,
        'parent': 6
    },
    {
        'id': 10,
        'title': 'MAPA DOS AGENTES',
        'route': 'agents-map',
        'routes': ['/agents-map'],
        'read': false,
        'iClass': 'fa fa-circle-o',
        'category': 'child',
        'hasChild': false,
        'parent': 6
    },
    {
        'id': 11,
        'title': 'COMUNIDADES',
        'route': '',
        'routes': ['/', '/community-list', '/community', '/details'],
        'read': false,
        'iClass': 'fa fa-home',
        'category': 'parent',
        'hasChild': true,
        'parent': 0
    },
    {
        'id': 12,
        'title': 'REGISTRO',
        'route': 'community-list',
        'routes': ['/community-list', '/community', '/details'],
        'read': false,
        'iClass': 'fa fa-circle-o',
        'category': 'child',
        'hasChild': false,
        'parent': 11
    },
    {
        'id': 13,
        'title': 'FAMÍLIA',
        'route': '',
        'routes': ['/', '/pregnant-list', '/details', '/pregnant',
                   '/responsible-list', '/responsible', '/child-list', '/child'],
        'read': false,
        'iClass': 'fa fa-users',
        'category': 'parent',
        'hasChild': true,
        'parent': 0
    },
    {
        'id': 14,
        'title': 'GESTANTE',
        'route': 'pregnant-list',
        'routes': ['/pregnant-list', '/pregnant', '/details'],
        'read': false,
        'iClass': 'fa fa-circle-o',
        'category': 'child',
        'hasChild': false,
        'parent': 13
    },
    {
        'id': 15,
        'title': 'RESPONSÁVEL',
        'route': 'responsible-list',
        'routes': ['/responsible-list', '/responsible', '/details'],
        'read': false,
        'iClass': 'fa fa-circle-o',
        'category': 'child',
        'hasChild': false,
        'parent': 13
    },
    {
        'id': 16,
        'title': 'CRIANÇA',
        'route': 'child-list',
        'routes': ['/child-list', '/child', '/details'],
        'read': false,
        'iClass': 'fa fa-circle-o',
        'category': 'child',
        'hasChild': false,
        'parent': 13
    },
    {
        'id': 17,
        'title': 'FORMULÁRIO',
        'route': '',
        'routes': ['/', '/form-template', '/form-template-list'],
        'read': false,
        'iClass': 'fa fa-list-alt',
        'category': 'parent',
        'hasChild': true,
        'parent': 0
    },
    {
        'id': 18,
        'title': 'REGISTRO',
        'route': 'form-template-list',
        'routes': ['/form-template', '/form-template-list'],
        'read': false,
        'iClass': 'fa fa-circle-o',
        'category': 'child',
        'hasChild': false,
        'parent': 17
    },
];

