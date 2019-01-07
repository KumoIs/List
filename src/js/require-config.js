require.config({
    baseUrl:'/',
    paths:{
        'jquery':'libs/jquery/jquery-1.11.3.min',
        'cookie':'libs/jquery/jquery-plugin/jquery.cookie',
        'header':'js/component/header',
        'main':'js/component/main',
        'footer':'js/component/footer'
    },

    //不符合AMD规范的模块，垫片
    shim:{
        'cookie':{
            deps:['jquery']
        }
    }
})