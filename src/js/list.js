require(["require-config"],()=>{
	require(['jquery','url','template','header','footer'],($,url,template)=>{      
        class list{
            constructor(){
                this.init();
                this.clicks();
            }
            init(){
                

               // console.log($.getJOSN("http://rap2api.taobao.org/app/mock/data/732889"))
                $.get(url.baseUrlRap,(data)=>{
                    const html = template("commodity",{list_item:data.res_body.data});
                    $('.main_centre_right_main').html(html);
                })
            }

            clicks(){
                $('.main_centre_right_main dl').each(function(i){
                    console.log(i);
                })
            }
           
        }
    
            
            
        new list();
    })
})