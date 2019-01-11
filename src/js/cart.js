require(['./require-config'],()=>{
    require(['jquery','url','template','cookie','header','footer'],($,url,template)=>{
        function Cart(){
            this.cartt=JSON.parse($.cookie('cart'))||[];
            this._this = this;
            this.load();
            if($.cookie('cart')){
                console.log('有Cookie值');
            }else{
                console.log('没有Cookie值');
            }
            //配置cookie自动在JS值与JSON值之间转换
			// $.cookie.json = true;
        }
        $.extend(Cart.prototype,{
            load(){
                // console.log(typeof(this.cartt))
               const html = template('cart_template',{"cartitem":this.cartt}); 
               $('.main_centre_left').html(html);

            this.next();
            this.prev();
            this.del();
            this.up();
            },

            next(){
                let _this =this;
                $('.next').on('click',function(){

                    let id = $(this).parents("dd").find('.id').html();
                    let price = $(this).parents("dd");
                    let num = $(this).next().val();

                    if(--num<1)
                        num = 1;

                    $(this).next().val(num);
                    price.find('.price').html(parseFloat(price.find('.oldprice').html())*parseInt($(this).next().val()));

                   _this.shop(id,num);
                   _this.up();

                })
            },


           
            prev(){
                let _this =this;
                $('.prev').on('click',function(){

                    let id = $(this).parents("dd").find('.id').html();
                    let price = $(this).parents("dd");
                    let num = $(this).prev().val();

                    if(++num > 99)
                        num = 99;

                    $(this).prev().val(num);
                    price.find('.price').html(parseFloat(price.find('.oldprice').html())*parseInt($(this).prev().val()));

                   _this.shop(id,num);
                   _this.up();  

                })
            },

            shop(id,num){
                let res = this.cartt;
                
                res.some(curr=>{

                    if (curr.id == id)
                    curr.num = num;

                })
                
            //     for(var i in res){
            //         var obj = {
            //             id : id,
            //             img : res[i].img,
            //             title : res[i].title,
            //             price : res[i].price,
            //             num : num
            //         }
            //    }
               
            //     let index ;
        
            //     const has = res.some((curr,i)=>{
            //         index = i;
            //         return curr.id==obj.id;
            //     });
            //     if(!has){
            //         res.push(obj)
            //     }else{
            //         res[index].num = num;
            //     }
                
                $.cookie('cart',JSON.stringify(res),{expires:10,path:"/"}); 
                console.log($.cookie('cart'));
            },

            del(){
                //事件  与 执行操作分离出来 当数量-到0 就执行删除操作(*注释 )
               let res = this.cartt;
               $('.deletBtn').on('click',function(){
                let _id = $(this).parents("dd").find('.id').html();
               
                    res = res.filter(function(curr){
                        return curr.id !=_id;
                    }) 
                    $.cookie('cart',JSON.stringify(res),{expires:10,path:"/"})
                    $(this).parents('dl').remove();
               })
            },
            up(){
                var price = $('.main_centre_left').find('.price');
                var num = 0;
                price.map(curr=>{
                    num += parseInt(price[curr].innerHTML);
                });
                $('.title_pri').html(num)
            }
        })
        new Cart()
    })
})