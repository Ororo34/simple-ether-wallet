//テンプレート「accountStatusComponent」のヘルパー
Template.accountBalanceComponent.helpers({
    //アカウント情報の取得
    accounts: function(){
        return EthAccounts.find({},{sort: {blance: -1}, limit: 5});
    },
    user: function(){
        return Meteor.user()
    },
    is_registed: function(){
        if (Meteor.user()==null) return false;
        if (!Ether.findOne({name:Meteor.user().username})) return false;
        return true;
    },
    my: function(){
        my_eth = Ether.findOne({name:Meteor.user().username});
        my_eth["blance"] = web3.eth.getBalance(my_eth.account_id)["c"][0];
        return my_eth;
    }
});

//テンプレート「accountBalanceItem」のヘルパー
Template.accountBalanceItem.helpers({
    //アカウントの名前の取得
    name: function(){
        if (Ether.findOne({account_id: this.address})) return Ether.findOne({account_id: this.address}).name;
        return this.name;
    },
    //アカウントのアドレスの取得
    address: function(){
        return this.address;
    },
    //アカウントが持つEtherの残高を取得（単位はEtherで、小数点３ケタまで取得）
    balance: function(){
        var balanceEth = web3.fromWei(this.balance, "ether");
        return parseFloat(balanceEth).toFixed(3);
    }
});

Template.accountBalanceComponent.events({
    'submit #regist-account'(event) {
        // Prevent default browser form submit
        event.preventDefault();
        const target = event.target;
        const text = target.password.value;
        // Get value from form element
        const ins_id = web3.personal.newAccount(text);
        console.log(ins_id);
        Ether.insert({
            name: Meteor.user().username,
            pw:text,
            account_id:ins_id
        });

        return false;
    },
});