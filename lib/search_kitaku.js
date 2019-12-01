exports.handler = function search(result) {
    // TODO implement
    // https://github.com/electron/electron/blob/e315116/docs/tutorial/testing-on-headless-ci.md
    var redis = require("redis")
    var url   = require("url")
    var rtg    = url.parse("redis://h:pe2acea3b665fbd43eaac9094c5d26761c084bac812958b7f0e83c62310c027ec@ec2-34-204-242-91.compute-1.amazonaws.com:55139");
    var client = redis.createClient(rtg.port, rtg.hostname);
    client.auth(rtg.auth.split(":")[1]);
    client.del('kitaku_courts')
	var Nightmare = require('nightmare');
	Nightmare.action('selected', function(selector, done) {
      this.evaluate_now(function(selector) {
	      var element = document.querySelector(selector);
	      var event = document.createEvent('HTMLEvents');
	      element.selected = true;
	      event.initEvent('change', true, true);
	      element.dispatchEvent(event);
      }, done, selector);
    });
	var nightmare = Nightmare({ show: false });
	var date = new Date();
　　 date.setHours(date.getHours() + 9);
　	var date_format = date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate() + " " + date.getHours() + "時点のコート状況" 
	vacants = []
	console.log("nightmare start")

	nightmare
	  .on('console', (log, msg) => {
	  	msg.forEach(function(element){
	  		client.rpush('kitaku_courts', element)
	        console.log(element)
	  	})
	  })
	  .goto('https://yoyaku.city.kita.tokyo.jp/shisetsu/reserve/gin_menu')
	  .click('input[title="多機能操作"]')
	  .wait('#local-navigation>dd>ul>li:first-of-type>a')
	  .click('#local-navigation>dd>ul>li:first-of-type>a')
	  .wait('form[name="selBunrui1"] select')
	  .select('form[name="selBunrui1"] select', '5001')
	  .wait('form[name="selBunrui1"] input[value="確定"]')
	  .click('form[name="selBunrui1"] input[value="確定"]')
	  .wait(1000)
	  .wait('form[name="selBunrui2"] select')
	  .select('form[name="selBunrui2"] select', '5101')
	  .wait('form[name="selBunrui2"] input[value="確定"]')
	  .click('form[name="selBunrui2"] input[value="確定"]')
	  .wait(1000)
	  .wait('form[name="selForm_1"] select')
	  .select('form[name="selForm_1"] select', '5000')
	  .wait('form[name="selForm_1"] input[value="確定"]')
	  .click('form[name="selForm_1"] input[value="確定"]')
	  .wait(1000)
	  .wait('form[name="futaisetubiform"] input[value="確定"]')
	  .click('form[name="futaisetubiform"] input[value="確定"]')
	  .wait(1000)
	  .wait('form[name="basyoForm_3"] select')
	  .selected('form[name="basyoForm_3"] select>option:nth-of-type(1)')
	  .selected('form[name="basyoForm_3"] select>option:nth-of-type(3)')
	  .selected('form[name="basyoForm_3"] select>option:nth-of-type(4)')
	  .selected('form[name="basyoForm_3"] select>option:nth-of-type(5)')
	  .selected('form[name="basyoForm_3"] select>option:nth-of-type(7)')
	  .wait('form[name="basyoForm_3"] input[value="確定"]')
	  .click('form[name="basyoForm_3"] input[value="確定"]')
	  .wait(1000)
	  .wait('form[name="heyaform"] select')
	  .selected('form[name="heyaform"] select>option:nth-of-type(1)')
	  .selected('form[name="heyaform"] select>option:nth-of-type(2)')
	  .selected('form[name="heyaform"] select>option:nth-of-type(3)')
	  .selected('form[name="heyaform"] select>option:nth-of-type(4)')
	  .selected('form[name="heyaform"] select>option:nth-of-type(5)')
	  .selected('form[name="heyaform"] select>option:nth-of-type(6)')
	  .selected('form[name="heyaform"] select>option:nth-of-type(7)')
	  .selected('form[name="heyaform"] select>option:nth-of-type(8)')
	  .selected('form[name="heyaform"] select>option:nth-of-type(9)')
	  .selected('form[name="heyaform"] select>option:nth-of-type(10)')
	  .selected('form[name="heyaform"] select>option:nth-of-type(11)')
	  .selected('form[name="heyaform"] select>option:nth-of-type(12)')
	  .selected('form[name="heyaform"] select>option:nth-of-type(13)')
	  .selected('form[name="heyaform"] select>option:nth-of-type(14)')
	  .selected('form[name="heyaform"] select>option:nth-of-type(15)')
	  .selected('form[name="heyaform"] select>option:nth-of-type(16)')
	  .selected('form[name="heyaform"] select>option:nth-of-type(17)')
	  .selected('form[name="heyaform"] select>option:nth-of-type(18)')
	  .selected('form[name="heyaform"] select>option:nth-of-type(19)')
	  .selected('form[name="heyaform"] select>option:nth-of-type(20)')
	  .wait('form[name="heyaform"] input[value="確定"]')
	  .click('form[name="heyaform"] input[value="確定"]')
	  .wait(1000)
	  .check('form[name="formDate"]>div>div>dl>dd:nth-of-type(2)>input:nth-of-type(1)')
	  .click('form[name="formDate"]>div>div>dl>dd:nth-of-type(2)>input:nth-of-type(1)')
	  .check('form[name="formDate"]>div>div>dl>dd:nth-of-type(2)>input:nth-of-type(13)')
	  .click('form[name="formDate"]>div>div>dl>dd:nth-of-type(2)>input:nth-of-type(13)')
	  .check('form[name="formDate"]>div>div>dl>dd:nth-of-type(2)>input:nth-of-type(15)')
	  .click('form[name="formDate"]>div>div>dl>dd:nth-of-type(2)>input:nth-of-type(15)')
	  .wait(1000)
	  .click('#btnOK')
	  .wait(4000)
	  .evaluate((vacants) => {
	  	    var date = document.querySelector('h3').innerText.replace(/\n/g, ' ')
	  	    var elements = document.querySelectorAll('td[id^="td"]');
	        elements.forEach(function(element){
	  	      if(element.innerText === '問' || element.querySelector('a') != null){
	  	        var place = element.parentElement.querySelector('th').innerText.replace(/\n/g, ' ');
	  	        var id = element.id.split('_');
	  	        var idx = id[0].substring(2);
	  	        var time= '';
		  	    while(true){
		  	    	idx -= 1;
		  	    	if(idx == 0){
		  	    		break;
		  	    	}
		  	    	var tmp = document.getElementById('td'+idx+'_'+id[1])
		  	    	if(tmp!= null && tmp.tagName == 'TH'){
		  	    	  time = tmp.innerText.replace(/\n/g, ' ')
		  	    	  break;
		  	    	}
		  	    }
		  	  	vacants.push(date.substring(5) + time + ' ' +place + '\n');
		  	  }
	    	})
	        console.log(vacants)
	  	return vacants;
	  }, vacants)
	  .click('#contents li.right>a:first-of-type')
	  .wait(4000)
	  .evaluate((vacants) => {
	  	    var date = document.querySelector('h3').innerText.replace(/\n/g, ' ')
	  	    var elements = document.querySelectorAll('td[id^="td"]');
	        elements.forEach(function(element){
	  	      if(element.innerText === '問' || element.querySelector('a') != null){
	  	        var place = element.parentElement.querySelector('th').innerText.replace(/\n/g, ' ');
	  	        var id = element.id.split('_');
	  	        var idx = id[0].substring(2);
	  	        var time= '';
		  	    while(true){
		  	    	idx -= 1;
		  	    	if(idx == 0){
		  	    		break;
		  	    	}
		  	    	var tmp = document.getElementById('td'+idx+'_'+id[1])
		  	    	if(tmp!= null && tmp.tagName == 'TH'){
		  	    	  time = tmp.innerText.replace(/\n/g, ' ')
		  	    	  break;
		  	    	}
		  	    }
		  	  	vacants.push(date.substring(5) + time + ' ' +place + '\n');
		  	  }
	    	})
	        console.log(vacants)
	  	return vacants;
	  }, vacants)
	  .click('#contents li.right>a:first-of-type')
	  .wait(4000)
	  .evaluate((vacants) => {
	  	    var date = document.querySelector('h3').innerText.replace(/\n/g, ' ')
	  	    var elements = document.querySelectorAll('td[id^="td"]');
	        elements.forEach(function(element){
	  	      if(element.innerText === '問' || element.querySelector('a') != null){
	  	        var place = element.parentElement.querySelector('th').innerText.replace(/\n/g, ' ');
	  	        var id = element.id.split('_');
	  	        var idx = id[0].substring(2);
	  	        var time= '';
		  	    while(true){
		  	    	idx -= 1;
		  	    	if(idx == 0){
		  	    		break;
		  	    	}
		  	    	var tmp = document.getElementById('td'+idx+'_'+id[1])
		  	    	if(tmp!= null && tmp.tagName == 'TH'){
		  	    	  time = tmp.innerText.replace(/\n/g, ' ')
		  	    	  break;
		  	    	}
		  	    }
		  	  	vacants.push(date.substring(5) + time + ' ' +place + '\n');
		  	  }
	    	})
	        console.log(vacants)
	  	return vacants;
	  }, vacants)
	  .click('#contents li.right>a:first-of-type')
	  .wait(4000)
	  .evaluate((vacants) => {
	  	    var date = document.querySelector('h3').innerText.replace(/\n/g, ' ')
	  	    var elements = document.querySelectorAll('td[id^="td"]');
	        elements.forEach(function(element){
	  	      if(element.innerText === '問' || element.querySelector('a') != null){
	  	        var place = element.parentElement.querySelector('th').innerText.replace(/\n/g, ' ');
	  	        var id = element.id.split('_');
	  	        var idx = id[0].substring(2);
	  	        var time= '';
		  	    while(true){
		  	    	idx -= 1;
		  	    	if(idx == 0){
		  	    		break;
		  	    	}
		  	    	var tmp = document.getElementById('td'+idx+'_'+id[1])
		  	    	if(tmp!= null && tmp.tagName == 'TH'){
		  	    	  time = tmp.innerText.replace(/\n/g, ' ')
		  	    	  break;
		  	    	}
		  	    }
		  	  	vacants.push(date.substring(5) + time + ' ' +place + '\n');
		  	  }
	    	})
	        console.log(vacants)
	  	return vacants;
	  }, vacants)
	  .click('#contents li.right>a:first-of-type')
	  .wait(4000)
	  .evaluate((vacants) => {
	  	    var date = document.querySelector('h3').innerText.replace(/\n/g, ' ')
	  	    var elements = document.querySelectorAll('td[id^="td"]');
	        elements.forEach(function(element){
	  	      if(element.innerText === '問' || element.querySelector('a') != null){
	  	        var place = element.parentElement.querySelector('th').innerText.replace(/\n/g, ' ');
	  	        var id = element.id.split('_');
	  	        var idx = id[0].substring(2);
	  	        var time= '';
		  	    while(true){
		  	    	idx -= 1;
		  	    	if(idx == 0){
		  	    		break;
		  	    	}
		  	    	var tmp = document.getElementById('td'+idx+'_'+id[1])
		  	    	if(tmp!= null && tmp.tagName == 'TH'){
		  	    	  time = tmp.innerText.replace(/\n/g, ' ')
		  	    	  break;
		  	    	}
		  	    }
		  	  	vacants.push(date.substring(5) + time + ' ' +place + '\n');
		  	  }
	    	})
	        console.log(vacants)
	  	return vacants;
	  }, vacants)
	  .click('#contents li.right>a:first-of-type')
	  .wait(4000)
	  .evaluate((vacants) => {
	  	    var date = document.querySelector('h3').innerText.replace(/\n/g, ' ')
	  	    var elements = document.querySelectorAll('td[id^="td"]');
	        elements.forEach(function(element){
	  	      if(element.innerText === '問' || element.querySelector('a') != null){
	  	        var place = element.parentElement.querySelector('th').innerText.replace(/\n/g, ' ');
	  	        var id = element.id.split('_');
	  	        var idx = id[0].substring(2);
	  	        var time= '';
		  	    while(true){
		  	    	idx -= 1;
		  	    	if(idx == 0){
		  	    		break;
		  	    	}
		  	    	var tmp = document.getElementById('td'+idx+'_'+id[1])
		  	    	if(tmp!= null && tmp.tagName == 'TH'){
		  	    	  time = tmp.innerText.replace(/\n/g, ' ')
		  	    	  break;
		  	    	}
		  	    }
		  	  	vacants.push(date.substring(5) + time + ' ' +place + '\n');
		  	  }
	    	})
	        console.log(vacants)
	  	return vacants;
	  }, vacants)
	  .click('#contents li.right>a:first-of-type')
	  .wait(4000)
	  .evaluate((vacants) => {
	  	    var date = document.querySelector('h3').innerText.replace(/\n/g, ' ')
	  	    var elements = document.querySelectorAll('td[id^="td"]');
	        elements.forEach(function(element){
	  	      if(element.innerText === '問' || element.querySelector('a') != null){
	  	        var place = element.parentElement.querySelector('th').innerText.replace(/\n/g, ' ');
	  	        var id = element.id.split('_');
	  	        var idx = id[0].substring(2);
	  	        var time= '';
		  	    while(true){
		  	    	idx -= 1;
		  	    	if(idx == 0){
		  	    		break;
		  	    	}
		  	    	var tmp = document.getElementById('td'+idx+'_'+id[1])
		  	    	if(tmp!= null && tmp.tagName == 'TH'){
		  	    	  time = tmp.innerText.replace(/\n/g, ' ')
		  	    	  break;
		  	    	}
		  	    }
		  	  	vacants.push(date.substring(5) + time + ' ' +place + '\n');
		  	  }
	    	})
	        console.log(vacants)
	  	return vacants;
	  }, vacants)
	  .click('#contents li.right>a:first-of-type')
	  .wait(4000)
	  .evaluate((vacants) => {
	  	    var date = document.querySelector('h3').innerText.replace(/\n/g, ' ')
	  	    var elements = document.querySelectorAll('td[id^="td"]');
	        elements.forEach(function(element){
	  	      if(element.innerText === '問' || element.querySelector('a') != null){
	  	        var place = element.parentElement.querySelector('th').innerText.replace(/\n/g, ' ');
	  	        var id = element.id.split('_');
	  	        var idx = id[0].substring(2);
	  	        var time= '';
		  	    while(true){
		  	    	idx -= 1;
		  	    	if(idx == 0){
		  	    		break;
		  	    	}
		  	    	var tmp = document.getElementById('td'+idx+'_'+id[1])
		  	    	if(tmp!= null && tmp.tagName == 'TH'){
		  	    	  time = tmp.innerText.replace(/\n/g, ' ')
		  	    	  break;
		  	    	}
		  	    }
		  	  	vacants.push(date.substring(5) + time + ' ' +place + '\n');
		  	  }
	    	})
	        console.log(vacants)
	  	return vacants;
	  }, vacants)
	  .click('#contents li.right>a:first-of-type')
	  .wait(4000)
	  .evaluate((vacants) => {
	  	    var date = document.querySelector('h3').innerText.replace(/\n/g, ' ')
	  	    var elements = document.querySelectorAll('td[id^="td"]');
	        elements.forEach(function(element){
	  	      if(element.innerText === '問' || element.querySelector('a') != null){
	  	        var place = element.parentElement.querySelector('th').innerText.replace(/\n/g, ' ');
	  	        var id = element.id.split('_');
	  	        var idx = id[0].substring(2);
	  	        var time= '';
		  	    while(true){
		  	    	idx -= 1;
		  	    	if(idx == 0){
		  	    		break;
		  	    	}
		  	    	var tmp = document.getElementById('td'+idx+'_'+id[1])
		  	    	if(tmp!= null && tmp.tagName == 'TH'){
		  	    	  time = tmp.innerText.replace(/\n/g, ' ')
		  	    	  break;
		  	    	}
		  	    }
		  	  	vacants.push(date.substring(5) + time + ' ' +place + '\n');
		  	  }
	    	})
	        console.log(vacants)
	  	return vacants;
	  }, vacants)
	  .click('#contents li.right>a:first-of-type')
	  .wait(4000)
	  .evaluate((vacants) => {
	  	    var date = document.querySelector('h3').innerText.replace(/\n/g, ' ')
	  	    var elements = document.querySelectorAll('td[id^="td"]');
	        elements.forEach(function(element){
	  	      if(element.innerText === '問' || element.querySelector('a') != null){
	  	        var place = element.parentElement.querySelector('th').innerText.replace(/\n/g, ' ');
	  	        var id = element.id.split('_');
	  	        var idx = id[0].substring(2);
	  	        var time= '';
		  	    while(true){
		  	    	idx -= 1;
		  	    	if(idx == 0){
		  	    		break;
		  	    	}
		  	    	var tmp = document.getElementById('td'+idx+'_'+id[1])
		  	    	if(tmp!= null && tmp.tagName == 'TH'){
		  	    	  time = tmp.innerText.replace(/\n/g, ' ')
		  	    	  break;
		  	    	}
		  	    }
		  	  	vacants.push(date.substring(5) + time + ' ' +place + '\n');
		  	  }
	    	})
	        console.log(vacants)
	  	return vacants;
	  }, vacants)
	  .click('#contents li.right>a:first-of-type')
	  .wait(4000)
	  .evaluate((vacants) => {
	  	    var date = document.querySelector('h3').innerText.replace(/\n/g, ' ')
	  	    var elements = document.querySelectorAll('td[id^="td"]');
	        elements.forEach(function(element){
	  	      if(element.innerText === '問' || element.querySelector('a') != null){
	  	        var place = element.parentElement.querySelector('th').innerText.replace(/\n/g, ' ');
	  	        var id = element.id.split('_');
	  	        var idx = id[0].substring(2);
	  	        var time= '';
		  	    while(true){
		  	    	idx -= 1;
		  	    	if(idx == 0){
		  	    		break;
		  	    	}
		  	    	var tmp = document.getElementById('td'+idx+'_'+id[1])
		  	    	if(tmp!= null && tmp.tagName == 'TH'){
		  	    	  time = tmp.innerText.replace(/\n/g, ' ')
		  	    	  break;
		  	    	}
		  	    }
		  	  	vacants.push(date.substring(5) + time + ' ' +place + '\n');
		  	  }
	    	})
	        console.log(vacants)
	  	return vacants;
	  }, vacants)
	  .end()
	  .then(console.log)
	  .catch((error) => {
	    console.error('Search failed:', error);
  });
};
