export const MENU = [

    {
        'id': 1,
        'title': 'USUÁRIO',
        'route': '',
        'routes': ['/', '/usuarios', '/registro', '/detalhes', '/perfis'],
        'read': false,
        'iClass': 'fa fa-user',
        'category': 'parent',
        'hasChild': true,
        'parent': 0
    },
    {
        'id': 2,
        'title': 'REGISTRO',
        'route': 'usuarios',
        'routes': ['/usuarios', '/registro', '/detalhes'],
        'read': false,
        'iClass': 'fa fa-circle-o',
        'category': 'child',
        'hasChild': false,
        'parent': 1
    },
    {
        'id': 3,
        'title': 'PERFIL',
        'route': 'perfis',
        'routes': ['/perfis'],
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
        'routes': ['/', '/capitulos', '/dashboard'],
        'read': false,
        'iClass': 'fa fa-file-text',
        'category': 'parent',
        'hasChild': true,
        'parent': 0
    },
    {
        'id': 5,
        'title': 'CAPÍTULOS',
        'route': 'capitulos',
        'routes': ['/capitulos', '/dashboard'],
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
        'routes': ['/', '/agente-dashboard', '/registro', '/detalhes', '/localizacao',
                   '/agente-visita', '/familias', '/historico', '/agente-desempenho', '/agentes-mapa'],
        'read': false,
        'iClass': 'fa fa-user',
        'category': 'parent',
        'hasChild': true,
        'parent': 0
    },
    {
        'id': 7,
        'title': 'REGISTRO',
        'route': 'agente-dashboard',
        'routes': ['agente-dashboard', '/registro', '/detalhes', '/localizacao'],
        'read': false,
        'iClass': 'fa fa-circle-o',
        'category': 'child',
        'hasChild': false,
        'parent': 6
    },
    {
        'id': 8,
        'title': 'HISTÓRICO DE VISITAS',
        'route': 'agente-visita',
        'routes': ['/agente-visita', '/familias', '/historico'],
        'read': false,
        'iClass': 'fa fa-circle-o',
        'category': 'child',
        'hasChild': false,
        'parent': 6
    },
    {
        'id': 9,
        'title': 'GRÁFICO DE DESEMPENHO',
        'route': 'agente-desempenho',
        'routes': ['/agente-desempenho'],
        'read': true,
        'iClass': 'fa fa-circle-o',
        'category': 'child',
        'hasChild': false,
        'parent': 6
    },
    {
        'id': 10,
        'title': 'MAPA DOS AGENTES',
        'route': 'agentes-mapa',
        'routes': ['/agentes-mapa'],
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
        'routes': ['/', '/comunidades', '/registro', '/detalhes'],
        'read': false,
        'iClass': 'fa fa-home',
        'category': 'parent',
        'hasChild': true,
        'parent': 0
    },
    {
        'id': 12,
        'title': 'REGISTRO',
        'route': 'comunidades',
        'routes': ['/comunidades', '/registro', '/detalhes'],
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
        'routes': ['/', '/gestantes', '/detalhes', '/registro',
                   '/responsaveis', '/criancas'],
        'read': false,
        'iClass': 'fa fa-users',
        'category': 'parent',
        'hasChild': true,
        'parent': 0
    },
    {
        'id': 14,
        'title': 'GESTANTE',
        'route': 'gestantes',
        'routes': ['/gestantes', '/registro', '/detalhes'],
        'read': false,
        'iClass': 'fa fa-circle-o',
        'category': 'child',
        'hasChild': false,
        'parent': 13
    },
    {
        'id': 15,
        'title': 'RESPONSÁVEL',
        'route': 'responsaveis',
        'routes': ['/responsaveis', '/registro', '/detalhes'],
        'read': false,
        'iClass': 'fa fa-circle-o',
        'category': 'child',
        'hasChild': false,
        'parent': 13
    },
    {
        'id': 16,
        'title': 'CRIANÇA',
        'route': 'criancas',
        'routes': ['/criancas', '/registro', '/detalhes'],
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
        'routes': ['/', '/registro', '/formularios', '/detalhes'],
        'read': false,
        'iClass': 'fa fa-list-alt',
        'category': 'parent',
        'hasChild': true,
        'parent': 0
    },
    {
        'id': 18,
        'title': 'REGISTRO',
        'route': 'formularios',
        'routes': ['/formularios', '/registro', '/detalhes'],
        'read': false,
        'iClass': 'fa fa-circle-o',
        'category': 'child',
        'hasChild': false,
        'parent': 17
    },
];

