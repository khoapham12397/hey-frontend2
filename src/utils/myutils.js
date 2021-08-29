export function formatMoney(x){
	if(x==0 || x==null) return x;
	let s = x.toString();
	let r = [s[s.length-1]], t=1;
	for(let i=s.length-2 ; i>=0; i--){
		r.push(s[i]);
		if(t%3==2 && i!=0) r.push(','); 
		t++;
	}
	
 	let arr = r.reverse();
	return arr.join("");
}