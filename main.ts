import{mkdirSync,readdirSync,readFileSync,writeFileSync}from'node:fs';
import{join}from'node:path';
function run(p,q){
const S=new Int32Array(256),C=new Int32Array(64),M=new Int32Array(256),O=new Uint8Array(65536);
let s=0,c=0,o=0,i=0,pc=0,n=0;
const E=x=>[O.subarray(0,o),x];
for(;;){
if(n===1e6)return E(10);
if(pc<0|pc>=p.length)return E(9);
const op=p[pc];
let im=0,pp=0,ps=0;
if(op===1){im=1;ps=1}else if(op===2){im=4;ps=1}else if(op===3)pp=1;
else if(op>3&&op<8){pp=op===4?1:op===7?3:2;ps=op<6?2:3}
else if(op>15&&op<35&&op!==31){pp=op===23||op===27?1:2;ps=1}
else if(op>47&&op<52){im=2;if(op>48&&op<51)pp=1}
else if(op===64)pp=ps=1;else if(op===65)pp=2;
else if(op>79&&op<84){if(op===82)ps=1;else pp=1}
else if(op&&op!==52)return E(5);
if(pc+im>=p.length)return E(9);
n++;const nx=pc+1+im;
if(s<pp)return E(2);
if(s-pp+ps>256)return E(3);
pc=nx;
if(op===0)return E(0);
if(op===1){S[s++]=(p[nx-1]<<24)>>24;continue}
if(op===2){S[s++]=p[nx-4]|p[nx-3]<<8|p[nx-2]<<16|p[nx-1]<<24;continue}
if(op===3){s--;continue}
if(op===4){S[s]=S[s-1];s++;continue}
if(op===5){const t=S[s-1];S[s-1]=S[s-2];S[s-2]=t;continue}
if(op===6){S[s]=S[s-2];s++;continue}
if(op===7){const a=S[s-3];S[s-3]=S[s-2];S[s-2]=S[s-1];S[s-1]=a;continue}
if(op===23){S[s-1]=-S[s-1]|0;continue}
if(op===27){S[s-1]=~S[s-1];continue}
if(op>15&&op<35){
const b=S[s-1],a=S[s-2];let r;
if(op===16)r=a+b|0;else if(op===17)r=a-b|0;else if(op===18)r=Math.imul(a,b);
else if(op>18&&op<23){
if(b===0)return E(4);
if(op===19)r=a===-2147483648&&b===-1?a:(a/b)|0;
else if(op===20)r=b===-1?0:a%b|0;
else if(op===21)r=Math.floor((a>>>0)/(b>>>0))|0;
else r=(a>>>0)%(b>>>0)|0;
}else if(op===24)r=a&b;else if(op===25)r=a|b;else if(op===26)r=a^b;
else if(op===28)r=a<<b;else if(op===29)r=a>>b;
else if(op===30)r=(a>>>b)|0;else if(op===32)r=+(a===b);
else if(op===33)r=+(a<b);else r=+((a>>>0)<(b>>>0));
s-=2;S[s++]=r;continue}
if(op===48||op===49||op===50){
const rel=((p[nx-2]|p[nx-1]<<8)<<16)>>16;let t=1;
if(op!==48){const v=S[--s];t=op===49?v===0:v!==0}
if(t)pc=nx+rel;continue}
if(op===51){if(c===64)return E(7);C[c++]=nx;pc=p[nx-2]|p[nx-1]<<8;continue}
if(op===52){if(c===0)return E(8);pc=C[--c];continue}
if(op===64){const a=S[s-1];if(a<0||a>255)return E(6);S[s-1]=M[a];continue}
if(op===65){const a=S[s-1],v=S[s-2];if(a<0||a>255)return E(6);s-=2;M[a]=v;continue}
if(op===80){const t=String(S[--s]);if(o+t.length>65536)return E(11);for(const k of t)O[o++]=k.charCodeAt(0);continue}
if(op===81){if(o>65535)return E(11);O[o++]=S[--s]&255;continue}
if(op===82){S[s++]=i<q.length?q[i++]:-1;continue}
return E(S[--s]&255);
}
}
const I=process.env.MAKEFUN_INPUT_DIR??'/input',O=process.env.MAKEFUN_OUTPUT_DIR??'/output';
for(const id of readdirSync(I).sort()){
const r=run(readFileSync(join(I,id,'program.bin')),readFileSync(join(I,id,'input.bin')));
mkdirSync(join(O,id),{recursive:true});
writeFileSync(join(O,id,'stdout.bin'),r[0]);
writeFileSync(join(O,id,'exit.txt'),r[1]+'\n');
}
