/*
 * jQuery Horizontal Move Plugin Beta 1.4.2
 * http://astrusweb.com/
 *
 * Copyright 2011 Astrusweb.com
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Date: 04-20-2011 (April 20, 2011)
 */

(function($) {

    $.fn.horizontalmove = function(options) {
        
        var movements = [];
        var page = !options.page ? 0 : options.page;
        var time = !options.time ? 1200 : options.time;
        var ease = !options.ease ? 'easeInOutQuart' : options.ease;
        
        options.main = !options.main ? '.horizontalmove-main:first' : options.main;
        options.mask = !options.mask ? '.horizontalmove-mask:first' : options.mask;
        options.item = !options.item ? '.horizontalmove-item' : options.item;        
        options.left = !options.left ? '.horizontalmove-left' : options.left;
        options.right = !options.right ? '.horizontalmove-right' : options.right;
                
        var main_width = 0,
            calc = 0,
            rest = 0;
        
        // cache
        var $this = $(this);
        var main = $this.find(options.main);
        var mask = $this.find(options.mask);
        
        $this.find(options.item).each(function(){
            main_width += $(this).width();
        });
        main.width(main_width);
        
        if(mask.width() > main_width)
        {
           return;             
        }
        
        calc = main.width() / mask.width();
        desloc = Math.floor(calc);

        if (calc != desloc) 
        {
            rest = main.width() - (mask.width() * desloc);
            desloc++;
        }

        for (var i = 0; i < desloc; i++) {
            if (rest != 0 && (desloc - 1) == i) {
                movements.push( rest + ( mask.width() * (i - 1) ) );
            } else {
                movements.push( mask.width() * i );
            }
        }
        
        var move = function(){
            
            try
            {
              !options.callBack ? '' : options.callBack(page);
            }catch(e){}
          
            main.stop().animate({
                left: - movements[page]
            }, time, ease,function(){!options.onComplete ? '' : options.onComplete(true)});
        };

        if(page > 0)
        {
          move(page);
        }
        
        $this.find(options.left).click(function(){
            page--;
            setPage(page);
        });

        $this.find(options.right).click(function(){
            page++;       
            setPage(page);
        });
        
        var setPage = function(p){
          page = p;            
          
          if (page < 0) 
          {
            page = 0;
          }else if (page >= movements.length) 
          {
            page = movements.length - 1;
          }
          
          move(page);            
        }
        
        return {
          setPage : setPage
        }
    };

})(jQuery);
