export const MENU = [

    {
        'id': 1,
        'title': 'Usuários',
        'route': '',
        // tslint:disable-next-line:quotemark
        'routes': ['/', '/user-list', '/user', '/user-edit', '/user-details', '/profile-list', '/page-list'],
        'read': true,
        'iClass': 'fa fa-users',
        'category': 'parent',
        'hasChild': true,
    },
    {
        'id': 2,
        'title': 'Registros',
        'route': 'user-list',
        // tslint:disable-next-line:quotemark
        'routes': ['/user-list', '/user', '/user-edit', '/user-details'],
        'read': true,
        'iClass': 'fa fa-circle-o',
        'category': 'child',
        'hasChild': false,
        'parent': 1
    },
    {
        'id': 3,
        'title': 'Perfil',
        'route': 'profile-list',
        // tslint:disable-next-line:quotemark
        'routes': ['/profile-list', '/page-list'],
        'read': true,
        'iClass': 'fa fa-circle-o',
        'category': 'child',
        'hasChild': false,
        'parent': 1
    },
    {
        'id': 4,
        'title': 'Livro',
        'route': '',
        // tslint:disable-next-line:quotemark
        'routes': ['/', '/template-chapter'],
        'read': true,
        'iClass': 'fa fa-file-text',
        'category': 'parent',
        'hasChild': true,
    },
    {
        'id': 5,
        'title': 'Capítulos',
        'route': 'template-chapter',
        // tslint:disable-next-line:quotemark
        'routes': ['/template-chapter'],
        'read': true,
        'iClass': 'fa fa-circle-o',
        'category': 'child',
        'hasChild': false,
        'parent': 4
    }

// tslint:disable-next-line:eofline
];
