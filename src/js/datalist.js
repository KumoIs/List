require(['./require-config'],function(){
    require(['jquery','url','template','cookie','header','footer'],function($,url,template){
        class datalist{
            constructor(){
                this.init();
                //配置cookie自动在JS值与JSON值之间转换
			    //$.cookie.json = true;
            }
            init(){
                     
                let arrSearch = location.search.slice(1).split("=");
                let searchObj = {};
                searchObj[arrSearch[0]] = arrSearch[1];
               
                $.ajax({
                    url:url.baseUrlRap+'/data-list',
                    type:"GET",  
                    data:searchObj,
                    dataType:"json", 
                    success: (res)=>{
                        if(res.res_code){
                            const html = template("datacommodity",{main_centre:res.res_body});
                            $('#main_centre').html(html);
                            this.shop(res.res_body,arrSearch[1]);
                        }
                    }
                })
            }


            shop(res,id){
                const obj = {
                    id :id,
                    title:res.title,
                    price:res.price,
                    img : res.img,
                    num : 1
                };
                let index ;
                $('#shopBtn').on('click',function(){
                    var arr = $.cookie("cart") ? JSON.parse($.cookie("cart")) : [];
                    console.log();
                    const has = arr.some((curr,i)=>{
                        index = i;
                        return curr.id==obj.id;
                    });
                    if(!has){
                        arr.push(obj)
                    }else{
                        arr[index].num++;
                    }
                    
                    
                    $.cookie('cart',JSON.stringify(arr),{expires:10,path:"/"}); 
                    console.log($.cookie('cart'));
                })
            }
        }      
        new datalist();
    })
})