


UserVoice = window.UserVoice || [];

(function () { var uv = document.createElement('script'); uv.type = 'text/javascript'; uv.async = true; uv.src = '//autodeskappstore.uservoice.com/widget_environment/cSItlRGR3U94Qe3SPqzOA.js'; var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(uv, s) })();


var valueUuid;
var oxygenId;
var isUnknown = localStorage.getItem('uuid') === null && localStorage.getItem('ox_id') === null;

if (isUnknown) {
    localStorage.setItem('uuid', uuidv4());
    localStorage.setItem('ox_id', String(Math.random()).split('.')[1]);
}

valueUuid = localStorage.getItem('uuid');
oxygenId = localStorage.getItem('ox_id');

var name = $(".Name_ox")[0].outerText;
var email = $(".Email_ox")[0].outerText;
var id = $(".id_ox")[0].outerText;



function uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}

const profile = {
    created_at: Date.now(),
    first_name: name,
    last_name: name,
    email: email,
    subscription_status: 'subsOK',
    oxygen_id: id 
}

GetNPS(profile, isUnknown);


function GetNPS(profile, isUnknown) {
    if (isUnknown) {
        const defaultProfile = {
            created_at: Date.now(),
            first_name: "Anonymous",
            last_name: "User",
            email: "no-email-provided" + valueUuid + "@autodesk.com",
            subscription_status: 'anonymous',
            oxygen_id: oxygenId // generate a random ID to be used for anonymous
        }

        const locales = {
            "en": {
                "SuccessTitle": "Thank you!",
                "SuccessMessage": "We appreciate your feedback.",
                "Feedback": "Feedback (optional)",
            }
        }

        const locale = 'en';
        const p = profile.email == null || profile.email === "" ? defaultProfile : profile;  // validate if the user is logged or no with the email property
        const identity = {
            cf_url: window.location.href,  // custom field for url
            created_at: p.created_at,
            email: p.email,
            type: p.subscription_status || 'unknown',
            id: p.oxygen_id,
            account: {
                id: window.location.hostname,
                name: window.location.hostname
            }
        };

        UserVoice.push(['identify', identity]);
        UserVoice.push(['set', {
            locale: locale,
            smartvote_enabled: false,
            post_suggestion_enabled: false,
            menu_enabled: true,
            accent_color: 'black',
            position: 'right',
            height: '225px',
            width: '450px',
            strings: {
                satisfaction_success_title: locales[locale]["SuccessTitle"],
                satisfaction_success_body: locales[locale]["SuccessMessage"],
                satisfaction_message_placeholder: locales[locale]["Feedback"],
            }
        }]);


        // Set colors
        UserVoice.push(['autoprompt', {
            target: '#footer',
            mode: 'satisfaction',
            accent_color: 'black',
            position: 'right',
            height: '225px',
            width: '450px',
        }]);
    } else {
        $("#nps").hide();
    }
    
}












