require(["require-config"],()=>{
	require(['jquery','url','template','header','footer'],($,url,template)=>{      
        class list{
            constructor(){
                this.init();
                console.log(url);
            }
            init(){
                

               // console.log($.getJOSN("http://rap2api.taobao.org/app/mock/data/732889"))
                $.get(url.baseUrlRap+'/list',(data)=>{
                    const html = template("commodity",{list_item:data.res_body.data});
                    $('.main_centre_right_main').html(html);
                    console.log(html);
                })
            }
        }
    
            
            
        new list();
    })
})