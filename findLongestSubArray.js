function findLongestSubarray (array) {
    
    var longest = array[0];  

    for(i=0;i<array.length;i++){
        if(array[i].length > longest.length){
            longest = array[i];
        }
    }

    return longest;

  }