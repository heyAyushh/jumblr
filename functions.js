var randomWord = require('random-word');

module.exports = () => {

    function evalscore(count)
    {
        if(count==1)
        {
            score++;
            return 0;
        }
        else
        {
            score--;
            return 0;
        }
        
    }

    function check(temp, word)
    {
        if(temp==word)
            return 1;
        return 0;
    }

}
