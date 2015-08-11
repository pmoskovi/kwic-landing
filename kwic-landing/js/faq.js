var faqData = {
  sectionList: [{
    section: 'Getting started',
    faqList: [{
      question: 'What is Kaazing KWIC for Active Directory?',
      answer: 'Your boss wants your new application running on Azure NOW, but it needs to securely connect to your existing infrastructure. Setting up a site-to-site VPN between your data center and the public cloud is going to take way too long. KWIC (KAAZING WebSocket Intercloud Connect), pronounced as quick, delivers simple, secure, hybrid cloud connectivity. No hardware required.'
    }, {
      question: 'How much does KWIC for Active Directory cost?',
      answer: 'It\'s free, and it always will be - if you sign up today.'
    }, {
      question: 'What do I need to get started using KWIC for Active Directory?',
      answer: '<img class="img-responsive" src="img/kwic1.png"><br/><br/>Getting started with KWIC for Active Directory is easy. All you need is two Ubuntu systems configured to communicate with each other. One running in the Microsoft Azure cloud and the other one running on-premises or in your private cloud.'
    }]
  }, {
    section: 'Configuration',
    faqList: [{
      question: 'How do I configure the cloud based Kaazing WebSocket Intercloud Connect for Active Directory?',
      answer: '<ul><li>Log in to your Microsoft Azure account, go to the Marketplace and search for Kaazing.</li><li>Select the KAAZING WebSocket Intercloud Connect item from the Marketplace catalog and launch.</li>'
    }, {
      question: 'How do I configure the on-premise Kaazing WebSocket Intercloud Connect for Active Directory?',
      answer: '<ul><li>Log in to your on-premise Ubuntu server</li><li>From the cloud gateway landing page copy/paste the curl cmd to your on-premise terminal window</li><li>Execute the curl command and follow the instructions.</li>'
    }, {
      question: 'During installation I entered the wrong login or password, while retrieving the truststore. Now what?',
      answer: 'After three attempts the login process will fail and you will be given the option to enter new credentials or quit from the truststore retrieval function.'
    }
    // ,
    // {
    //   question: 'How can I review the installation script?',
    //   answer: ''
    // },
    //  {
    //   question: 'What if I need to update my Active Directory configuration?',
    //   answer: ''
    // }
  ]
  }, {
    section: 'Security',
    faqList: [{
      question: 'What is the truststore, and why do I need one?',
      answer: '<ul><li>The truststore is a file containing certificates for hosts and certificate authorities trusted by the KAAZING Gateway.</li><li>In order to connect to a back-end server using TLS/SSL, the KAAZING Gateway must have the certificate for the host name of the back-end server in the truststore.</li></ul>'
    }
    // ,
    //  {
    //   question: 'How do I configure SSL/TLS between the on-premise KAAZING gateway and my Active Directory server?',
    //   answer: ''
    // }
  ]
  }, {
    section: 'Testing',
    faqList: [{
      question: 'How can I test if the gateways are talking to each other?',
      answer: '<ul><li>To test end-to-end connectivity, you can issue an Active Directory query from a client application, such as <em>ldapsearch</em>. <br/><img class="img-responsive" src="img/kwictest2.png"></li><li>An example query from your on-premise gateway to your cloud gateway running on Azure would be:<br><code>ssh azureuser@mycloudkwic.cloudapp.net \'ldapsearch -x -h localgw -p 389 -s base -b "" "objectclass=*" vendorVersion\'</code></li>'
    }]
  }]
};

// Takes a string and makes it URL-safe. The string is intended to be
// the FAQ title, so it can be converted in an anchor name that is
// URL-friendly.
//
var maxAnchorNameLength = 70;
var buildAnchorName = function(title) {

  // Convert spaces to hyphens.
  var anchorName = title.replace(/ /g, '-');

  // Remove other special characters that might appear in a question.
  anchorName = anchorName.replace(/[\?\.\!,\'"@#$%^\&\*\(\)\[\]:;<>\/\\]/g, '');

  // Make sure it's not too long.
  if (anchorName.length > maxAnchorNameLength) {
    anchorName = anchorName.substring(0, maxAnchorNameLength);

    // Cut the string at the last full word. But only if there is a hyphen.
    var lastHyphenPos = anchorName.lastIndexOf('-');
    if (lastHyphenPos > 0) {
      anchorName = anchorName.substring(0, lastHyphenPos);
    }
  }

  // Don't end on a hypen.
  while (anchorName.substr(anchorName.length-1) == '-') {
    anchorName = anchorName.substring(0, anchorName.length-1);
  }

  // Encode the string to something URL-friendly.
  anchorName = encodeURIComponent(anchorName);

  return anchorName;
}

var buildFaqList = function(faqData) {
  var sectionName, question, answer;

  var faqListContainer = document.getElementById('faqContainer');

  for (var i = 0; i < faqData.sectionList.length; i++) {
    var sectionTitle = document.createElement('h3');
    sectionTitle.innerHTML = faqData.sectionList[i].section;
    var sectionList = document.createElement('ul');

    faqListContainer.appendChild(sectionTitle);
    faqListContainer.appendChild (sectionList);

    for (var j = 0; j < faqData.sectionList[i].faqList.length; j++) {

      var questionItem = document.createElement('li');
      // questionItem.className = "";
      questionLink = document.createElement('a');
      questionLink.appendChild(document.createTextNode(faqData.sectionList[i].faqList[j].question));
      questionLink.href = "#" + buildAnchorName(faqData.sectionList[i].faqList[j].question)
      questionItem.appendChild(questionLink);
//      questionItem.innerHTML = faqData.sectionList[i].faqList[j].question;

      // questionPanelHeading.appendChild(questionItem);
      // questionPanel.appendChild(questionPanelHeading);
      sectionList.appendChild(questionItem);
    }
  }

  faqListContainer.appendChild (document.createElement('br'));
  faqListContainer.appendChild (document.createElement('br'));

  for (var i = 0; i < faqData.sectionList.length; i++) {
    var sectionPanelGroup = document.createElement('div');
    sectionPanelGroup.className = 'panel-group';
    sectionPanelGroup.id = 'accordion' + i;
    var sectionTitle = document.createElement('h2');
    sectionTitle.className = 'section-heading';
    sectionTitle.innerHTML = faqData.sectionList[i].section;

    sectionPanelGroup.appendChild(sectionTitle);
    faqListContainer.appendChild(sectionPanelGroup);

    for (var j = 0; j < faqData.sectionList[i].faqList.length; j++) {

      var questionPanel = document.createElement('div');
      questionPanel.className = 'panel panel-default panel-faq';
      questionAnchor = document.createElement('a');
      questionAnchor.className = 'anchor';
      questionAnchor.setAttribute('name', buildAnchorName(faqData.sectionList[i].faqList[j].question));
      questionPanel.appendChild(questionAnchor);
      var questionPanelHeading = document.createElement('div');
      questionPanelHeading.className = 'panel-heading panel-heading-faq';
      var questionHeading = document.createElement('h4');
      questionHeading.className = 'panel-title';
      var questionAnchor = document.createElement('a');
      questionAnchor.className = 'accordion-toggle collapsed';
      questionAnchor.setAttribute('data-toggle', 'collapse');
      // questionAnchor.setAttribute('data-parent', '#accordion' + i);
      questionAnchor.setAttribute('href', '#collapse' + i + j);
      questionAnchor.innerHTML = faqData.sectionList[i].faqList[j].question;

      questionHeading.appendChild(questionAnchor);
      questionPanelHeading.appendChild(questionHeading);
      questionPanel.appendChild(questionPanelHeading);
      sectionPanelGroup.appendChild(questionPanel);

      var answerPanel = document.createElement('div');
      answerPanel.id = 'collapse' + i + j;
      answerPanel.className = 'panel-collapse collapse in';
      var answerPanelBody = document.createElement('div');
      answerPanelBody.className = 'panel-body';
      answerPanelBody.innerHTML = faqData.sectionList[i].faqList[j].answer;

      answerPanel.appendChild(answerPanelBody);
      questionPanel.appendChild(answerPanel);
    }
  }
};

buildFaqList(faqData);