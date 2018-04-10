export const MENU = [

    {
        'id': 1,
        'title': 'USUÁRIO',
        'route': '',
        'routes': ['/', '/user-list', '/user', '/user-edit', '/user-details', '/profile-list', '/page-list'],
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
        'routes': ['/user-list', '/user', '/user-edit', '/user-details'],
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
        'routes': ['/profile-list', '/page-list'],
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
        'routes': ['/', '/template-chapter', '/chapter-dashboard'],
        'read': false,
        'iClass': 'fa fa-file-text',
        'category': 'parent',
        'hasChild': true,
        'parent': 0
    },
    {
        'id': 5,
        'title': 'CAPÍTULOS',
        'route': 'template-chapter',
        'routes': ['/template-chapter', '/chapter-dashboard'],
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
        'routes': ['/', '/agent-map', '/agent-list', '/agent', '/agent-details', '/agent-location',
                   '/visit-historic', '/family-list', '/visit-historic-list'],
        'read': true,
        'iClass': 'fa fa-user',
        'category': 'parent',
        'hasChild': true,
        'parent': 0
    },
    {
        'id': 7,
        'title': 'REGISTRO',
        'route': 'agent-list',
        'routes': ['/agent-list', '/agent', '/agent-details', '/agent-location'],
        'read': true,
        'iClass': 'fa fa-circle-o',
        'category': 'child',
        'hasChild': false,
        'parent': 6
    },
    {
        'id': 16,
        'title': 'HISTÓRICO DE VISITAS',
        'route': '/visit-historic',
        'routes': ['/visit-historic', '/family-list', '/visit-historic-list'],
        'read': true,
        'iClass': 'fa fa-circle-o',
        'category': 'child',
        'hasChild': false,
        'parent': 6
    },
    {
        'id': 7,
        'title': 'MAPA DOS AGENTES',
        'route': 'agent-map',
        'routes': ['/agent-map'],
        'read': true,
        'iClass': 'fa fa-circle-o',
        'category': 'child',
        'hasChild': false,
        'parent': 6
    },
    {
        'id': 8,
        'title': 'COMUNIDADES',
        'route': '',
        'routes': ['/', '/community-list', '/community', '/community-details'],
        'read': false,
        'iClass': 'fa fa-home',
        'category': 'parent',
        'hasChild': true,
        'parent': 0
    },
    {
        'id': 9,
        'title': 'REGISTRO',
        'route': 'community-list',
        'routes': ['/community-list', '/community', '/community-details'],
        'read': false,
        'iClass': 'fa fa-circle-o',
        'category': 'child',
        'hasChild': false,
        'parent': 8
    },
    {
        'id': 10,
        'title': 'FAMÍLIA',
        'route': '',
        'routes': ['/', '/pregnant-list', '/pregnant-details', '/pregnant',
                   '/responsible-list', '/responsible', '/responsible-details',
                   '/child-list', '/child', '/child-details'],
        'read': false,
        'iClass': 'fa fa-users',
        'category': 'parent',
        'hasChild': true,
        'parent': 0
    },
    {
        'id': 11,
        'title': 'GESTANTE',
        'route': 'pregnant-list',
        'routes': ['/pregnant-list', '/pregnant', '/pregnant-details'],
        'read': false,
        'iClass': 'fa fa-circle-o',
        'category': 'child',
        'hasChild': false,
        'parent': 10
    },
    {
        'id': 12,
        'title': 'RESPONSÁVEL',
        'route': 'responsible-list',
        'routes': ['/responsible-list', '/responsible', '/responsible-details'],
        'read': false,
        'iClass': 'fa fa-circle-o',
        'category': 'child',
        'hasChild': false,
        'parent': 10
    },
    {
        'id': 13,
        'title': 'CRIANÇA',
        'route': 'child-list',
        'routes': ['/child-list', '/child', '/child-details'],
        'read': false,
        'iClass': 'fa fa-circle-o',
        'category': 'child',
        'hasChild': false,
        'parent': 10
    },
    {
        'id': 14,
        'title': 'FORMULÁRIO',
        'route': '',
        'routes': ['/', '/form-template', '/form-template-list'],
        'read': true,
        'iClass': 'fa fa-list-alt',
        'category': 'parent',
        'hasChild': true,
        'parent': 0
    },
    {
        'id': 15,
        'title': 'REGISTRO',
        'route': 'form-template-list',
        'routes': ['/form-template', '/form-template-list'],
        'read': true,
        'iClass': 'fa fa-circle-o',
        'category': 'child',
        'hasChild': false,
        'parent': 14
    },


// tslint:disable-next-line:eofline
];
