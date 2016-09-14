/**
 * Created by Oleg on 07.09.2016.
 */
var shortlink=function(){
    var result="", abd ='abcdstuvwxyzQWERTYUIOPLijklmnopqrKJHGFDSAZXCefghVBNM', n=5;
    while(result.length<n){
        result+=abd[Math.random()*abd.length|0];
    }
    return result;

};
exports.doShort=shortlink;

