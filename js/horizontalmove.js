/*
 * jQuery Horizontal Move Plugin Beta 1.2
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

        var main_width = 0,
            calc = 0,
            rest = 0;
        
        // cache
        var $this = $(this);
        var main = $this.find('.horizontalmove-main:first');
        var mask = $this.find('.horizontalmove-mask:first');
        
        $this.find('.horizontalmove-item').each(function(){
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
            main.stop().animate({
                left: - movements[page]
            }, time, ease,function(){!options.onComplete ? '' : options.onComplete(true)});
        };

        if(page > 0)
        {
          move(page);
        }
        
        $this.find('.horizontalmove-left').click(function(){
            page--;
            if (page < 0) {
                page = 0;
            }
            move(page);
        });

        $this.find('.horizontalmove-right').click(function(){
            page++;
            if (page >= movements.length) {
                page = movements.length - 1;
            }
            move(page);
        });
    };

})(jQuery);
