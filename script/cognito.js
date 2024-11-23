/* global WildRydes _config AmazonCognitoIdentity */

var WildRydes = window.WildRydes || {};

(function scopeWrapper($) {
    var poolData = {
        UserPoolId: _config.cognito.userPoolId, // Cognito User Pool ID
        ClientId: _config.cognito.userPoolClientId // Cognito App Client ID
    };

    var userPool;

    if (!(_config.cognito.userPoolId &&
          _config.cognito.userPoolClientId &&
          _config.cognito.region)) {
        alert("Cognito configuration is missing!");
        return;
    }

    userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

    /*
     * Cognito User Pool functions
     */
    function register(email, password, onSuccess, onFailure) {
        var dataEmail = {
            Name: 'email',
            Value: email
        };
        var attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute(dataEmail);

        userPool.signUp(email, password, [attributeEmail], null, function signUpCallback(err, result) {
            if (!err) {
                onSuccess(result);
            } else {
                onFailure(err);
            }
        });
    }

    /*
     *  Event Handlers
     */
    $(function onDocReady() {
        $('#registrationForm').submit(handleRegister);
    });

    function handleRegister(event) {
        var email = $('#emailInputRegister').val();
        var password = $('#passwordInputRegister').val();
        var password2 = $('#password2InputRegister').val();

        event.preventDefault();

        if (password === password2) {
            register(email, password, function registerSuccess(result) {
                alert('Registration successful! Please check your email for the verification code.');
                console.log('User name is ' + result.user.getUsername());
                window.location.href = 'verify.html';
            }, function registerFailure(err) {
                alert(err.message || JSON.stringify(err));
            });
        } else {
            alert('Passwords do not match.');
        }
    }
}(jQuery));
