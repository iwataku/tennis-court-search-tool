exports.handler = function search(result) {
    // TODO implement
    // https://github.com/electron/electron/blob/e315116/docs/tutorial/testing-on-headless-ci.md
    var redis = require("redis")
    var url = require("url")
    var rtg = url.parse("redis://h:pe2acea3b665fbd43eaac9094c5d26761c084bac812958b7f0e83c62310c027ec@ec2-34-204-242-91.compute-1.amazonaws.com:55139");
    var client = redis.createClient(rtg.port, rtg.hostname);
    client.auth(rtg.auth.split(":")[1]);
    client.del('chuoku_courts')
    client.del('chuoku_target_cache')
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

    var promise = nightmare
        .on('console', (log, msg) => {
            console.log(msg)
            client.rpush('chuoku_courts', msg.toString())
        })
        .goto('http://www.11489.jp/Chuo/Web/StartPage.aspx?language=JAPANESE&SSCode=002')
        .wait(4000)
        .click('#rbtnMonth')
        .click('#rbtnAllday')
        .click('#chkSat')
        .click('#chkSun')
        .click('#chkHol')
        .click('#ucPCFooter_btnForward')
        .wait(8000)
        .evaluate(() => {
            var elements = document.querySelectorAll('a[id^=dlRepeat_ctl00_tpItem_dgTable]')
            elements.forEach(function(element) {
                if (element.innerText.includes('△') || element.innerText.includes('○')) {
                    var event = document.createEvent('MouseEvent');
                    event.initEvent('click', true, true);
                    element.dispatchEvent(event);
                    event.initEvent('mousedown', true, true);
                    element.dispatchEvent(event);
                    event.initEvent('mouseup', true, true);
                    element.dispatchEvent(event);
                }
            })
        })
        .wait(1000)
        .click('#dlRepeat_ctl00_tpItem_lnkNextLeft')
        .wait(4000)
        .evaluate(() => {
            var elements = document.querySelectorAll('a[id^=dlRepeat_ctl]')
            elements.forEach(function(element) {
                if (element.innerText.includes('○')) {
                    var index = element.id.match(/\d+/g)
                    var court_name = document.querySelector('#dlRepeat_ctl' + index[0] + '_tpItem_lblShitsujou').innerText
                    var date = document.querySelector('#dlRepeat_ctl' + index[0] + '_tpItem_dgTable>tbody>tr>td').innerText.replace(/\n/, '')
                    // console.log(index)
                    // console.log(Number(index[2]) + 3)
                    var court_number = document.querySelector('#dlRepeat_ctl' + index[0] + '_tpItem_dgTable_ctl' + index[1] + '_lblMen').innerText
                    var time = document.querySelector('#dlRepeat_ctl' + index[0] + '_tpItem_dgTable>tbody>tr>td:nth-of-type(' + (Number(index[2]) + 3) + ')').innerText.replace(/\n/, '')
                    console.log(date + time + court_name + court_number)
                }
            })
        })
        .wait(3000)
        .end()
        .then()
        .catch((error) => {
            console.error('Search failed:', error);
        });


    // promise
    //     .then(
    //         (ids) => {
    //             console.log('next')
    //             console.log(ids)
    //             ids.forEach(function(id) {
    //                 nightmare
    //                     .on('console', (log, msg) => {
    //                         console.log(msg)
    //                         client.rpush('chuoku_courts', msg.toString())
    //                     })
    //                     .click('#' + id)
    //                     .mousedown('#' + id)
    //                     .mouseup('#' + id)
    //                     .wait(1000)
    //                     .click('#dlRepeat_ctl00_tpItem_lnkNextLeft')
    //                     .wait(4000)
    //                     .evaluate(() => {
    //                         var elements = document.querySelectorAll('a[id^=dlRepeat_ctl00_tpItem_dgTable]')
    //                         elements.forEach(function(element) {
    //                             if (element.innerText.includes('○')) {
    //                                 console.log(element.id)
    //                                 var court_name = document.querySelector('#dlRepeat_ctl00_tpItem_lblShitsujou').innerText
    //                                 var date = document.querySelector('#dlRepeat_ctl00_tpItem_dgTable>tbody>tr>td').innerText
    //                                 var index = element.id.match(/\d+/g)
    //                                 console.log(index)
    //                                 console.log(Number(index[2]) + 3)
    //                                 var court_number = document.querySelector('#dlRepeat_ctl00_tpItem_dgTable_ctl' + index[1] + '_lblMen')
    //                                 var time = document.querySelector('#dlRepeat_ctl00_tpItem_dgTable>tbody>tr>td:nth-of-type(' + (Number(index[2]) + 3) + ')').innerText
    //                                 console.log(date + time + court_name + court_number)
    //                             }
    //                         })
    //                     })
    //                     .wait(3000)
    //                     .click('#dlRepeat_ctl00_tpItem_lnkBackCenter')
    //                     .wait(8000)
    //             })
    //         }
    //     )
    //     .then(() => {
    //         nightmare
    //             .catch((error) => {
    //                 console.error('Search failed:', error);
    //             });

    //     })



    //  nightmare
    // .end()
    // .then(console.log)
    // .catch((error) => {
    //   console.error('Search failed:', error);
    //  });
};