# generated visual implementation
def rng_for(s): return np.random.default_rng(int(hashlib.sha256(s.encode()).hexdigest()[:8],16))
def savefig(path):
    plt.tight_layout(); plt.savefig(path,dpi=120,bbox_inches='tight'); plt.close()

def draw_pipeline(ax, labels):
    ax.axis('off'); xs=np.linspace(0.05,0.8,len(labels))
    for j,(x,label) in enumerate(zip(xs,labels)):
        ax.add_patch(Rectangle((x,0.4),0.14,0.22,fill=False,lw=2)); ax.text(x+0.07,0.51,label,ha='center',va='center',fontsize=10)
        if j<len(labels)-1: ax.add_patch(FancyArrowPatch((x+0.14,0.51),(xs[j+1],0.51),arrowstyle='->',mutation_scale=14,lw=1.6))
    ax.set_xlim(0,1); ax.set_ylim(0,1)

def static_visual(t, profile, out):
    kind=profile['kind']; title=t['title']; r=rng_for(t['iid'])
    fig=None
    # Matrix/heatmap family
    if kind in {'matrix_product','elimination','factorization','joint','attention','data_split','distributed'}:
        fig,ax=plt.subplots(figsize=(7,4)); mat=r.normal(size=(6,6))
        if kind=='matrix_product': mat=np.arange(36).reshape(6,6)
        sns.heatmap(mat,ax=ax,cbar=False); ax.set_title(title); ax.set_xlabel('列 / key / feature'); ax.set_ylabel('行 / query / sample')
    elif kind in {'linear_vector','angle','projection','independence','basis','subspace','basis_transform'}:
        fig,ax=plt.subplots(figsize=(6,5)); ax.axhline(0,lw=.8); ax.axvline(0,lw=.8)
        v=np.array([2.,1.]); w=np.array([-1.,2.])
        ax.quiver(0,0,*v,angles='xy',scale_units='xy',scale=1); ax.quiver(0,0,*w,angles='xy',scale_units='xy',scale=1)
        if kind in {'projection','subspace'}:
            p=np.array([2.0,2.4]); b=np.array([2.5,0.8]); q=b*(p@b)/(b@b)
            ax.quiver(0,0,*p,angles='xy',scale_units='xy',scale=1); ax.plot([p[0],q[0]],[p[1],q[1]],ls='--'); ax.scatter([q[0]],[q[1]],s=60)
        if kind=='independence': ax.fill([0,v[0],v[0]+w[0],w[0]],[0,v[1],v[1]+w[1],w[1]],alpha=.15)
        ax.set_xlim(-3,4); ax.set_ylim(-2,4); ax.set_aspect('equal'); ax.grid(alpha=.25); ax.set_title(title)
    elif kind in {'matrix_transform','determinant','conditioning','eigen','svd','quadratic_form'}:
        fig,ax=plt.subplots(figsize=(6,5));
        th=np.linspace(0,2*np.pi,200); circ=np.c_[np.cos(th),np.sin(th)]
        A={'conditioning':np.array([[3,0],[0,.3]]),'eigen':np.array([[2,.5],[.5,1]]),'svd':np.array([[2,.8],[.2,.6]]),'quadratic_form':np.array([[1.8,0],[0,.6]])}.get(kind,np.array([[1.6,.6],[-.2,1.1]]))
        outp=circ@A.T; ax.plot(circ[:,0],circ[:,1],ls='--'); ax.plot(outp[:,0],outp[:,1],lw=2)
        ax.quiver(0,0,A[0,0],A[1,0],angles='xy',scale_units='xy',scale=1); ax.quiver(0,0,A[0,1],A[1,1],angles='xy',scale_units='xy',scale=1)
        ax.set_aspect('equal'); ax.grid(alpha=.25); ax.set_title(title)
    elif kind in {'least_squares','weighted_regression','regression','regularization','robust_regression'}:
        fig,ax=plt.subplots(figsize=(7,4)); x=np.linspace(0,5,18); y=1.1*x+1+r.normal(0,.8,len(x)); y[-1]+=4
        ax.scatter(x,y); coef=np.polyfit(x,y,1); ax.plot(x,np.polyval(coef,x),lw=2)
        if kind=='weighted_regression': ax.errorbar(x,y,yerr=np.linspace(.2,1.1,len(x)),fmt='none',alpha=.5)
        ax.set_title(title); ax.set_xlabel('x'); ax.set_ylabel('y'); ax.grid(alpha=.2)
    elif kind in {'low_rank','pseudoinverse','pca','preprocess','random_projection','tensor','multiview'}:
        fig,ax=plt.subplots(figsize=(6,5)); cov=np.array([[3,2.2],[2.2,2.0]]); X=r.multivariate_normal([0,0],cov,120); ax.scatter(X[:,0],X[:,1],s=12,alpha=.6)
        vals,vecs=np.linalg.eigh(np.cov(X.T)); v=vecs[:,np.argmax(vals)]; ax.quiver(0,0,3*v[0],3*v[1],angles='xy',scale_units='xy',scale=1)
        ax.set_aspect('equal'); ax.grid(alpha=.2); ax.set_title(title)
    elif kind in {'probability','conditional','counting','logic'}:
        fig,ax=plt.subplots(figsize=(6,5)); grid=np.arange(36).reshape(6,6); sns.heatmap(grid%2,ax=ax,cbar=False,annot=True,fmt='d'); ax.set_title(title); ax.set_xlabel('結果2'); ax.set_ylabel('結果1')
    elif kind in {'distribution','moments','sampling','inference','likelihood','confidence','hypothesis','information'}:
        fig,ax=plt.subplots(figsize=(7,4)); x=np.linspace(-4,4,400); y=np.exp(-x*x/2)/np.sqrt(2*np.pi); ax.plot(x,y,lw=2); ax.fill_between(x,y,alpha=.18); ax.set_title(title); ax.grid(alpha=.2)
        if kind=='hypothesis': ax.axvline(1.96,ls='--'); ax.axvline(-1.96,ls='--')
        if kind=='likelihood': ax.set_xlabel('parameter'); ax.set_ylabel('likelihood')
    elif kind in {'bayes'}:
        fig,ax=plt.subplots(figsize=(7,4)); labels=['H1','H2']; prior=np.array([.7,.3]); post=np.array([.35,.65]); X=np.arange(2); w=.34; ax.bar(X-w/2,prior,w,label='prior'); ax.bar(X+w/2,post,w,label='posterior'); ax.set_xticks(X,labels); ax.set_ylim(0,1); ax.legend(); ax.set_title(title)
    elif kind in {'complexity','long_context','scaling'}:
        fig,ax=plt.subplots(figsize=(7,4)); n=np.linspace(1,50,200); ax.plot(n,np.log2(n),label='log n'); ax.plot(n,n/10,label='n'); ax.plot(n,n*np.log2(n)/100,label='n log n'); ax.plot(n,n*n/500,label='n²'); ax.legend(); ax.set_title(title); ax.grid(alpha=.2)
    elif kind in {'graph','tree','dag','relation','graph_nn'}:
        fig,ax=plt.subplots(figsize=(6,5)); ax.axis('off'); pts=np.array([[.1,.5],[.3,.8],[.3,.2],[.55,.65],[.55,.35],[.82,.5]])
        edges=[(0,1),(0,2),(1,3),(2,4),(3,5),(4,5)]
        if kind=='tree': edges=[(0,1),(0,2),(1,3),(1,4),(2,5)]
        for a,b in edges: ax.plot([pts[a,0],pts[b,0]],[pts[a,1],pts[b,1]],lw=1.8)
        ax.scatter(pts[:,0],pts[:,1],s=180); [ax.text(x,y,str(j),ha='center',va='center') for j,(x,y) in enumerate(pts)]; ax.set_title(title)
    elif kind in {'modular'}:
        fig,ax=plt.subplots(figsize=(5,5)); th=np.linspace(0,2*np.pi,8,endpoint=False); pts=np.c_[np.cos(th),np.sin(th)]; ax.scatter(pts[:,0],pts[:,1],s=150); [ax.text(x,y,str(j),ha='center',va='center') for j,(x,y) in enumerate(pts)]; ax.set_aspect('equal'); ax.axis('off'); ax.set_title(title)
    elif kind in {'numeric_error','convergence','approximation','quadrature','linear_solver','eigen_numeric','inverse_problem','monte_carlo'}:
        fig,ax=plt.subplots(figsize=(7,4)); k=np.arange(1,30); y=10**(-k/8)+1e-8; ax.semilogy(k,y,lw=2); ax.set_xlabel('iteration / resolution'); ax.set_ylabel('error / residual'); ax.grid(alpha=.2); ax.set_title(title)
    elif kind in {'root','interpolation','ode','fourier','convolution'}:
        fig,ax=plt.subplots(figsize=(7,4)); x=np.linspace(0,6,300); y=np.sin(x)+.25*np.sin(3*x); ax.plot(x,y,lw=2); ax.scatter(np.linspace(0,6,9),np.sin(np.linspace(0,6,9))+0.25*np.sin(3*np.linspace(0,6,9)),s=30); ax.grid(alpha=.2); ax.set_title(title)
    elif kind in {'convexity','optimization','optimality','gradient_opt','second_order_opt','constrained','duality','proximal','stochastic','nonconvex'}:
        fig,ax=plt.subplots(figsize=(6,5)); x=np.linspace(-3,3,180); y=np.linspace(-3,3,180); X,Y=np.meshgrid(x,y); Z=(X-1)**2+2*(Y+.8)**2
        if kind=='nonconvex': Z=np.sin(X)*np.cos(Y)+.08*(X*X+Y*Y)
        ax.contour(X,Y,Z,levels=14); ax.set_aspect('equal'); ax.set_title(title)
        p=np.array([-2.4,2.1]); path=[p.copy()]
        for _ in range(7):
            if kind=='nonconvex': g=np.array([np.cos(p[0])*np.cos(p[1])+.16*p[0],-np.sin(p[0])*np.sin(p[1])+.16*p[1]])
            else: g=np.array([2*(p[0]-1),4*(p[1]+.8)])
            p=p-.18*g; path.append(p.copy())
        q=np.array(path); ax.plot(q[:,0],q[:,1],'-o',ms=4)
    elif kind in {'fourier'}:
        pass
    elif kind in {'classifier','kernel','clustering','anomaly','feature','bias_variance','calibration','monitoring','tree_model','boosting','cv'}:
        fig,ax=plt.subplots(figsize=(6,5)); A=r.normal([-1,-1],[.65,.65],size=(45,2)); B=r.normal([1,1],[.65,.65],size=(45,2)); ax.scatter(A[:,0],A[:,1],s=15); ax.scatter(B[:,0],B[:,1],s=15); ax.axline((0,.2),slope=-1,ls='--'); ax.grid(alpha=.2); ax.set_title(title)
    elif kind in {'nn','backprop','activation','normalization','cnn','sequence','embedding','multimodal','distributed','efficiency','safety'}:
        if kind=='activation':
            fig,ax=plt.subplots(figsize=(7,4)); x=np.linspace(-4,4,300); ax.plot(x,np.maximum(0,x),label='ReLU'); ax.plot(x,1/(1+np.exp(-x)),label='sigmoid'); ax.plot(x,np.tanh(x),label='tanh'); ax.legend(); ax.grid(alpha=.2); ax.set_title(title)
        elif kind=='cnn':
            fig,ax=plt.subplots(figsize=(6,5)); sns.heatmap(np.arange(64).reshape(8,8)%7,ax=ax,cbar=False); ax.add_patch(Rectangle((2,2),3,3,fill=False,lw=3)); ax.set_title(title)
        else:
            fig,ax=plt.subplots(figsize=(7,4)); draw_pipeline(ax,['入力','表現','変換','出力']); ax.set_title(title)
    elif kind in {'attention'}:
        fig,ax=plt.subplots(figsize=(6,5)); M=r.random((7,7)); M=M/M.sum(1,keepdims=True); sns.heatmap(M,ax=ax,cbar=False); ax.set_title(title); ax.set_xlabel('Key'); ax.set_ylabel('Query')
    elif kind in {'latent_model','generative','diffusion','contrastive'}:
        fig,ax=plt.subplots(figsize=(6,5)); A=r.normal([-1,0],[.5,.5],size=(50,2)); B=r.normal([1,0],[.5,.5],size=(50,2)); ax.scatter(A[:,0],A[:,1],s=14); ax.scatter(B[:,0],B[:,1],s=14); ax.set_title(title); ax.grid(alpha=.2)
    elif kind in {'foundation','tokenization','prompt','adaptation','rag','vector_search','agent','multi_agent','preference','alignment','evaluation','interpretability','uncertainty','synthetic','scientific_ml','governance'}:
        fig,ax=plt.subplots(figsize=(8,4)); labels={
            'rag':['Query','検索','Context','生成'], 'agent':['観測','Plan','Tool','結果'], 'tokenization':['文字列','Token','Embedding','Context'],
            'adaptation':['Base W','Low-rank Δ','適応','Task'], 'preference':['Prompt','Chosen/Rejected','比較','Policy'], 'scientific_ml':['Data','Model','Physics','Loss'],
            'governance':['Data','Train','Deploy','Audit']}.get(kind,['入力','Model','評価','出力'])
        draw_pipeline(ax,labels); ax.set_title(title)
    else:
        fig,ax=plt.subplots(figsize=(7,4)); draw_pipeline(ax,['入力','定義','計算','検算']); ax.set_title(title)
    savefig(out)


def make_animation(t, profile, out):
    kind=profile['kind']; r=rng_for(t['iid']); tmp=out.parent/f'.frames-{t["iid"]}'; tmp.mkdir(parents=True,exist_ok=True); fps=[]
    for k in range(10):
        fig,ax=plt.subplots(figsize=(6,4))
        if kind=='root':
            x=np.linspace(-2.5,2.5,300); f=x**3-x-1; ax.plot(x,f); ax.axhline(0,lw=.8); p=2.2
            for _ in range(k+1): p=p-(p**3-p-1)/(3*p*p-1)
            fp=p**3-p-1; slope=3*p*p-1; xx=np.linspace(p-.8,p+.8,40); ax.plot(xx,fp+slope*(xx-p)); ax.scatter([p],[fp],s=50); ax.set_ylim(-5,5)
        elif kind in {'gradient_opt','second_order_opt','stochastic','constrained'}:
            x=np.linspace(-3,3,150); y=np.linspace(-3,3,150); X,Y=np.meshgrid(x,y); Z=(X-1)**2+2*(Y+.8)**2; ax.contour(X,Y,Z,levels=12)
            p=np.array([-2.4,2.2]); path=[p.copy()]
            for j in range(k+1):
                g=np.array([2*(p[0]-1),4*(p[1]+.8)])
                if kind=='stochastic': g=g+r.normal(0,.5,2)
                if kind=='second_order_opt': p=np.array([1.,-.8]) if j>=1 else p-.2*g
                else: p=p-.18*g
                path.append(p.copy())
            q=np.array(path); ax.plot(q[:,0],q[:,1],'-o'); ax.set_aspect('equal'); ax.set_xlim(-3,3); ax.set_ylim(-3,3)
        elif kind=='sampling':
            n=[1,2,5,10,20,50,100,200,500,1000][k]; means=r.exponential(1,size=(300,n)).mean(1); ax.hist(means,bins=24,density=True,alpha=.7); ax.set_xlim(0,3); ax.set_title(f'n={n}')
        elif kind=='bayes':
            prior=np.array([.7,.3]); like=np.array([.35,.8]); post=prior.copy()
            for _ in range(k+1): post=post*like; post=post/post.sum()
            ax.bar(['H1','H2'],post); ax.set_ylim(0,1); ax.set_title(f'観測 {k+1} 回後')
        elif kind=='confidence':
            theta=0.; centers=r.normal(theta,.35,20); se=.35; y=np.arange(20); ax.axvline(theta,ls='--')
            upto=max(1,2*(k+1)); ax.errorbar(centers[:upto],y[:upto],xerr=1.96*se,fmt='o'); ax.set_xlim(-1.5,1.5); ax.set_ylim(-1,20)
        elif kind in {'convergence','quadrature','monte_carlo','long_context','scaling'}:
            n=np.arange(1,100); y=1/np.sqrt(n); upto=10*(k+1); ax.loglog(n[:upto],y[:upto]); ax.set_xlim(1,100); ax.set_ylim(.08,1.2); ax.grid(alpha=.2)
        elif kind=='eigen_numeric':
            A=np.array([[2,.4],[.4,1]]); v=np.array([.2,1.]);
            for _ in range(k+1): v=A@v; v=v/np.linalg.norm(v)
            ax.axhline(0,lw=.8); ax.axvline(0,lw=.8); ax.quiver(0,0,*v,angles='xy',scale_units='xy',scale=1); ax.set_xlim(-1.2,1.2); ax.set_ylim(-1.2,1.2); ax.set_aspect('equal')
        elif kind=='ode':
            h=1/(k+2); ts=np.arange(0,3+h,h); ys=[1.]
            for tt in ts[:-1]: ys.append(ys[-1]+h*(-ys[-1]))
            xx=np.linspace(0,3,300); ax.plot(xx,np.exp(-xx),label='exact'); ax.plot(ts,ys,'-o',label=f'h={h:.2f}'); ax.legend(); ax.set_ylim(0,1.1)
        elif kind=='projection':
            th=np.pi*(.15+.06*k); p=np.array([2.,2.]); b=np.array([np.cos(th),np.sin(th)])*2.5; q=b*(p@b)/(b@b)
            ax.quiver(0,0,*p,angles='xy',scale_units='xy',scale=1); ax.quiver(0,0,*b,angles='xy',scale_units='xy',scale=1); ax.plot([p[0],q[0]],[p[1],q[1]],ls='--'); ax.scatter([q[0]],[q[1]]); ax.set_xlim(-1,3); ax.set_ylim(-1,3); ax.set_aspect('equal')
        elif kind=='elimination':
            M=np.array([[2.,1.,5.],[4.,-1.,7.],[1.,2.,4.]])
            for j in range(min(k,2)):
                if j==0: M[1]=M[1]-2*M[0]; M[2]=M[2]-.5*M[0]
                else: M[2]=M[2]-(M[2,1]/M[1,1])*M[1]
            sns.heatmap(M,annot=True,cbar=False,ax=ax,fmt='.1f')
        elif kind=='pca':
            cov=np.array([[3,2.2],[2.2,2]]); X=r.multivariate_normal([0,0],cov,100); vals,vecs=np.linalg.eigh(np.cov(X.T)); v=vecs[:,np.argmax(vals)]; th=(k/9)*math.atan2(v[1],v[0]); u=np.array([np.cos(th),np.sin(th)]); ax.scatter(X[:,0],X[:,1],s=10); ax.quiver(0,0,3*u[0],3*u[1],angles='xy',scale_units='xy',scale=1); ax.set_aspect('equal')
        elif kind=='weighted_regression':
            x=np.linspace(0,5,14); y=1.1*x+1+r.normal(0,.7,len(x)); sig=np.linspace(.2,1.2,len(x)); w=1/(sig**2*(1+.25*k)); A=np.c_[x,np.ones_like(x)]; beta=np.linalg.solve(A.T@(w[:,None]*A),A.T@(w*y)); ax.errorbar(x,y,yerr=sig,fmt='o'); ax.plot(x,A@beta); ax.set_ylim(-1,9)
        elif kind=='convolution' or kind=='cnn':
            M=np.arange(64).reshape(8,8)%7; sns.heatmap(M,ax=ax,cbar=False); col=k%6; row=(k//6)%6; ax.add_patch(Rectangle((col,row),3,3,fill=False,lw=3))
        elif kind in {'classifier','clustering'}:
            A=r.normal([-1,-1],[.6,.6],size=(35,2)); B=r.normal([1,1],[.6,.6],size=(35,2)); ax.scatter(A[:,0],A[:,1],s=12); ax.scatter(B[:,0],B[:,1],s=12); slope=-1+.18*k; ax.axline((0,0),slope=slope,ls='--'); ax.set_xlim(-3,3); ax.set_ylim(-3,3)
        elif kind=='cv':
            ax.axis('off'); K=5
            for row in range(K):
                for col in range(K): ax.add_patch(Rectangle((.1+.15*col,.75-.12*row),.13,.09,alpha=.25 if col!=row else .8))
            ax.set_xlim(0,1); ax.set_ylim(0,1)
        elif kind=='backprop':
            draw_pipeline(ax,['x','h1','h2','L']); ax.text(.5,.2,'逆向きに勾配を伝播' if k>4 else '前向きに値を計算',ha='center')
        elif kind in {'attention'}:
            M=np.eye(7)*(.2+.08*k)+r.random((7,7))*.1; M=M/M.sum(1,keepdims=True); sns.heatmap(M,ax=ax,cbar=False)
        elif kind in {'generative','diffusion'}:
            pts=r.normal(0,1,size=(120,2)); scale=max(.15,1-k/10); pts[:,1]*=scale; ax.scatter(pts[:,0],pts[:,1],s=10); ax.set_xlim(-3,3); ax.set_ylim(-3,3)
        elif kind=='distributed':
            draw_pipeline(ax,['worker1','all-reduce','平均g','update']); ax.text(.5,.2,f'step {k+1}',ha='center')
        elif kind=='rag':
            draw_pipeline(ax,['Query','検索','Context','生成']); ax.text(.12+.22*(k%4),.25,'▲',ha='center',fontsize=18)
        elif kind=='agent':
            draw_pipeline(ax,['観測','Plan','Tool','結果']); ax.text(.12+.22*(k%4),.25,'▲',ha='center',fontsize=18)
        elif kind=='uncertainty':
            conf=np.linspace(0,1,100); err=1-conf; tau=.1+.08*k; ax.plot(conf,err); ax.axvline(tau,ls='--'); ax.set_xlabel('confidence'); ax.set_ylabel('risk'); ax.set_ylim(0,1)
        elif kind=='proximal':
            x=np.linspace(-3,3,300); lam=.15+.08*k; y=np.sign(x)*np.maximum(np.abs(x)-lam,0); ax.plot(x,y); ax.axhline(0,lw=.8); ax.axvline(0,lw=.8); ax.set_title(f'threshold={lam:.2f}')
        else:
            draw_pipeline(ax,['入力','変換','評価','出力']); ax.text(.12+.22*(k%4),.25,'▲',ha='center',fontsize=18)
        ax.set_title(t['title']);
        fp=tmp/f'{k:02d}.png'; savefig(fp); fps.append(fp)
    frames=[Image.open(p).convert('P',palette=Image.ADAPTIVE) for p in fps]
    frames[0].save(out,save_all=True,append_images=frames[1:],duration=150,loop=0,optimize=True)
    shutil.rmtree(tmp)


for t in PROFILES:
    p=t["profile"]
    c=t["course"]
    portal=ROOT/f"apps/portal/public/visuals/course-{c}"
    slide=ROOT/f"apps/slides/decks/assets/course-{c}"
    portal.mkdir(parents=True,exist_ok=True); slide.mkdir(parents=True,exist_ok=True)
    png=portal/f"{t['iid']}.png"
    static_visual(t,p,png); shutil.copy2(png,slide/png.name)
    if p.get("animate"):
        gif=portal/f"{t['iid']}.gif"
        make_animation(t,p,gif); shutil.copy2(gif,slide/gif.name)
print(f"PASS: regenerated visuals for {len(PROFILES)} Course 02-10 topics")
