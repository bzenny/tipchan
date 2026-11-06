import './style.css';
import { isAddress } from 'viem';
const app = document.querySelector<HTMLDivElement>('#app')!;
const params = new URLSearchParams(location.search);
const handle = params.get('creator') || 'yourcreator';
const recipient = params.get('to') || '';
const esc = (s: string) => s.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]!));
app.innerHTML = `<header><a class="logo" href="/">↗ Tip<span>CHAN</span></a><nav><a href="#how">How it works</a><a href="#create">Create a page</a></nav></header><main><section class="hero"><small>NONCUSTODIAL · BASE · USDC</small><h1>Support creators.<br><em>Without the middleman.</em></h1><p>One link. Direct wallet-to-wallet support. No custody of your funds.</p><a class="primary" href="#create">Create your tip page →</a></section><section class="card" id="tip"><div class="avatar">✦</div><small>CREATOR PREVIEW</small><h2>@${esc(handle)}</h2><p>Enjoying my work? Leave a tip.</p><div class="amounts"><button data-amount="2">$2</button><button data-amount="5">$5</button><button data-amount="10">$10</button><button data-amount="25">$25</button></div><label>Amount in USDC<input id="amount" type="number" min=".01" step=".01" value="5"></label><p class="note">Base Sepolia · Preview mode</p><button class="primary" id="pay" disabled>Payments disabled in foundation build</button><p class="note" id="recipient"></p></section><section class="card" id="create"><h2>Create your link</h2><p>Enter a public wallet address. Never enter a seed phrase.</p><label>Creator handle<input id="handle" placeholder="yourname" maxlength="32"></label><label>Receiving wallet<input id="wallet" placeholder="0x..."></label><button class="primary" id="generate">Generate preview link</button><p id="result" class="note"></p><p class="note">Preview links are not registered accounts. Wallet ownership is not verified yet.</p></section><section id="how"><h2>Simple by design</h2><div class="steps"><article><b>01</b><h3>Add your wallet</h3><p>Your public EVM address.</p></article><article><b>02</b><h3>Share your page</h3><p>One link for supporters.</p></article><article><b>03</b><h3>Receive directly</h3><p>Payments will settle on Base after verification is implemented.</p></article></div></section></main><footer>TipCHAN · Your audience. Your wallet. Your money. · v0.1 prototype</footer>`;
document.querySelector('#recipient')!.textContent = isAddress(recipient) ? 'Preview recipient: '+recipient : 'No recipient configured.';
document.querySelector('#generate')!.addEventListener('click', () => {
 const name = (document.querySelector<HTMLInputElement>('#handle')!.value).trim().toLowerCase();
 const wallet = document.querySelector<HTMLInputElement>('#wallet')!.value.trim();
 const output = document.querySelector<HTMLElement>('#result')!;
 if (!/^[a-z0-9_-]{3,32}$/.test(name) || !isAddress(wallet)) {output.textContent='Enter a valid handle and EVM address.';return;}
 const url = new URL(location.href); url.search = new URLSearchParams({creator:name,to:wallet}).toString(); url.hash='tip';
 const link=document.createElement('a');link.href=url.toString();link.textContent='Open your creator preview';output.replaceChildren(link);
});
