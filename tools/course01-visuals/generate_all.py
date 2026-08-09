from pathlib import Path
import shutil, zipfile, textwrap, math
import numpy as np
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
matplotlib.rcParams['font.family'] = 'Noto Sans CJK JP'
matplotlib.rcParams['axes.unicode_minus'] = False
from matplotlib.patches import Rectangle, FancyArrowPatch
from mpl_toolkits.mplot3d import Axes3D  # noqa: F401
from PIL import Image
import seaborn as sns

ROOT = Path.cwd()
if ROOT.exists():
    shutil.rmtree(ROOT)
slide_dir = ROOT/'apps/slides/decks'
slide_asset_dir = slide_dir/'assets/course-01'
portal_textbook_dir = ROOT/'apps/portal/textbook'
portal_public_dir = ROOT/'apps/portal/public/visuals/course-01'
visual_tools_dir = ROOT/'tools/course01-visuals'
for d in [slide_dir, slide_asset_dir, portal_textbook_dir, portal_public_dir, visual_tools_dir]:
    d.mkdir(parents=True, exist_ok=True)

# ---------- visuals ----------
def savefig(path):
    plt.tight_layout()
    plt.savefig(path, dpi=140, bbox_inches='tight')
    plt.close()

def copy_assets(tmp_dir):
    final_assets = {
        'limits_continuity.png', 'limits_approach.gif',
        'derivative_secant_tangent.png', 'secant_to_tangent.gif',
        'chain_rule_flow.png', 'onevar_optimization.png',
        'integral_riemann.png', 'integral_accumulation.gif',
        'taylor_orders.png', 'taylor_progression.gif',
        'multivar_surface_slices.png',
        'gradient_direction.png', 'directional_derivative.gif',
        'jacobian_grid.png', 'jacobian_grid_deform.gif',
        'hessian_contours.png', 'hessian_heatmap.png',
        'multivar_chain_graph.png',
        'unconstrained_paths.png', 'optimization_trajectories.gif',
        'lagrange_touch.png', 'lagrange_levels.gif',
    }
    for name in sorted(final_assets):
        p = tmp_dir / name
        if not p.exists():
            raise FileNotFoundError(f'missing generated Course 01 asset: {name}')
        shutil.copy2(p, slide_asset_dir / name)
        shutil.copy2(p, portal_public_dir / name)


def make_gif(frame_paths, out_path, duration=130):
    frames = [Image.open(fp).convert('P') for fp in frame_paths]
    frames[0].save(out_path, save_all=True, append_images=frames[1:], duration=duration, loop=0)


def generate_visuals():
    tmp = ROOT/'_tmp'
    if tmp.exists(): shutil.rmtree(tmp)
    tmp.mkdir()

    # 1 limits
    x = np.linspace(-3,3,400)
    fig, axes = plt.subplots(1,2,figsize=(10,4))
    axes[0].plot(x,np.sin(x),lw=2); axes[0].axvline(0,ls='--',alpha=0.5); axes[0].axhline(0,ls='--',alpha=0.5)
    axes[0].scatter([0],[0],s=40); axes[0].set_title('連続: 近づく先と実際の値が一致')
    yj = np.where(x<0,-1,1)
    axes[1].plot(x[x<0],yj[x<0],lw=2); axes[1].plot(x[x>=0],yj[x>=0],lw=2)
    axes[1].scatter([0],[0],s=40,facecolors='white',edgecolors='black'); axes[1].set_title('不連続: 左右極限が一致しない')
    for ax in axes: ax.set_xlim(-3,3); ax.set_ylim(-2,2); ax.grid(alpha=0.25)
    savefig(tmp/'limits_continuity.png')
    frames=[]; a=1.0
    for k,x0 in enumerate(np.linspace(0.2,1.8,22)):
        fig, ax = plt.subplots(figsize=(6,4)); xs=np.linspace(0,2,400); ys=np.exp(xs)
        ax.plot(xs,ys,lw=2); ax.axvline(a,ls='--',alpha=0.5); ax.axhline(math.e,ls='--',alpha=0.5)
        ax.scatter([x0],[math.exp(x0)],s=60); ax.text(x0,math.exp(x0)+0.2,f'x={x0:.2f}',fontsize=10)
        ax.text(a+0.03,math.e+0.18,r'$L=e$',fontsize=11); ax.set_title(r'$x\to a$ のとき $f(x)\to L$')
        ax.set_xlim(0,2); ax.set_ylim(0.8,8); ax.grid(alpha=0.25)
        fp=tmp/f'limitsf{k:02d}.png'; savefig(fp); frames.append(fp)
    make_gif(frames,tmp/'limits_approach.gif')

    # 2 derivative
    x=np.linspace(-2,2,400); y=x**2
    fig, ax=plt.subplots(figsize=(6,4)); ax.plot(x,y,lw=2)
    x1,x2=0.3,1.5; y1,y2=x1**2,x2**2
    ax.scatter([x1,x2],[y1,y2],s=40); ax.plot([x1,x2],[y1,y2],lw=2,label='割線')
    xt=0.8; yt=xt**2; slope=2*xt; xx=np.linspace(xt-0.8,xt+0.8,20)
    ax.plot(xx,yt+slope*(xx-xt),lw=2,label='接線'); ax.legend(); ax.grid(alpha=0.25); ax.set_title('平均変化率と瞬間変化率')
    savefig(tmp/'derivative_secant_tangent.png')
    frames=[]; x=np.linspace(-1.5,2,400); y=x**2; x0=0.7
    for k,h in enumerate(np.linspace(1.2,0.05,22)):
        fig, ax=plt.subplots(figsize=(6,4)); ax.plot(x,y,lw=2)
        p1=(x0,x0**2); p2=(x0+h,(x0+h)**2)
        ax.scatter([p1[0],p2[0]],[p1[1],p2[1]],s=50); ax.plot([p1[0],p2[0]],[p1[1],p2[1]],lw=2,label=f'割線 h={h:.2f}')
        ax.plot(xx, p1[1]+2*x0*(xx-x0), lw=2, label='極限の接線')
        ax.set_xlim(-1.5,2); ax.set_ylim(-0.2,4); ax.grid(alpha=0.25); ax.legend(loc='upper left',fontsize=9); ax.set_title(r'$h\to0$ で割線が接線へ近づく')
        fp=tmp/f'derivf{k:02d}.png'; savefig(fp); frames.append(fp)
    make_gif(frames,tmp/'secant_to_tangent.gif')

    # 3 chain rule flow
    fig, ax=plt.subplots(figsize=(8,3)); ax.axis('off')
    for label,x0 in [('x',0.1),('u=g(x)',0.4),('y=f(u)',0.75)]:
        ax.add_patch(Rectangle((x0,0.4),0.18,0.25, fill=False, lw=2)); ax.text(x0+0.09,0.525,label,ha='center',va='center',fontsize=12)
    ax.add_patch(FancyArrowPatch((0.28,0.52),(0.4,0.52),arrowstyle='->',mutation_scale=14,lw=2))
    ax.add_patch(FancyArrowPatch((0.58,0.52),(0.75,0.52),arrowstyle='->',mutation_scale=14,lw=2))
    ax.text(0.32,0.63,r'$g: x\mapsto u$',fontsize=11); ax.text(0.62,0.63,r'$f: u\mapsto y$',fontsize=11)
    ax.text(0.35,0.15,r'$\dfrac{dy}{dx}=\dfrac{dy}{du}\dfrac{du}{dx}$',fontsize=18)
    savefig(tmp/'chain_rule_flow.png')

    # 4 one variable optimization
    x=np.linspace(-3,3,500); y=0.15*(x+2.2)*(x-0.4)*(x-2)+1.5
    fig, ax=plt.subplots(figsize=(7,4)); ax.plot(x,y,lw=2)
    crit=np.array([-1.2,1.45]); cy=0.15*(crit+2.2)*(crit-0.4)*(crit-2)+1.5
    ax.scatter(crit,cy,s=60); ax.text(-1.55,2.2,'局所極大'); ax.text(1.05,0.7,'局所極小'); ax.grid(alpha=0.25); ax.set_title('停留点を候補として調べる')
    savefig(tmp/'onevar_optimization.png')

    # 5 integral
    x=np.linspace(0,2.5,400); y=np.sin(x)+1.4
    fig, ax=plt.subplots(figsize=(7,4)); ax.plot(x,y,lw=2)
    xs=np.linspace(0,2.4,9)
    for i in range(8):
        xL,xR=xs[i],xs[i+1]; h=np.sin((xL+xR)/2)+1.4
        ax.add_patch(Rectangle((xL,0),xR-xL,h,alpha=0.25))
    ax.fill_between(x,y,alpha=0.15); ax.set_ylim(0,2.8); ax.grid(alpha=0.25); ax.set_title('Riemann和と面積近似')
    savefig(tmp/'integral_riemann.png')
    frames=[]; x=np.linspace(0,3,400); y=np.cos(x)+1.5
    for k,b in enumerate(np.linspace(0.3,3.0,22)):
        fig, ax=plt.subplots(figsize=(6,4)); ax.plot(x,y,lw=2)
        mask=x<=b; ax.fill_between(x[mask],y[mask],alpha=0.25); ax.axvline(b,ls='--',alpha=0.6)
        area=np.trapezoid(y[mask],x[mask])
        ax.text(0.1,2.6,rf'$A(x)=\int_0^x f(t)\,dt$\n$A({b:.2f})\approx {area:.2f}$',fontsize=11)
        ax.set_ylim(0,3); ax.grid(alpha=0.25); ax.set_title('上端を動かすと累積面積も変わる')
        fp=tmp/f'intf{k:02d}.png'; savefig(fp); frames.append(fp)
    make_gif(frames,tmp/'integral_accumulation.gif')

    # 6 taylor
    x=np.linspace(-2,2,400); f=np.exp(x); p1=1+x; p2=1+x+x**2/2; p3=1+x+x**2/2+x**3/6
    fig, ax=plt.subplots(figsize=(7,4)); ax.plot(x,f,lw=2,label=r'$e^x$'); ax.plot(x,p1,lw=2,label='1次'); ax.plot(x,p2,lw=2,label='2次'); ax.plot(x,p3,lw=2,label='3次')
    ax.set_xlim(-2,2); ax.set_ylim(-1,8); ax.grid(alpha=0.25); ax.legend(); ax.set_title('次数を上げると局所近似が改善')
    savefig(tmp/'taylor_orders.png')
    frames=[]; x=np.linspace(-2,2,400); f=np.sin(x); polys=[x, x-x**3/6, x-x**3/6+x**5/120]; labels=['1次','3次','5次']
    for k,(poly,label) in enumerate(zip(polys,labels)):
        fig, ax=plt.subplots(figsize=(6,4)); ax.plot(x,f,lw=2,label=r'$\sin x$'); ax.plot(x,poly,lw=2,label=f'{label}近似')
        ax.set_xlim(-2,2); ax.set_ylim(-1.4,1.4); ax.grid(alpha=0.25); ax.legend(); ax.set_title(f'Taylor近似: {label}')
        fp=tmp/f'tay{k:02d}.png'; savefig(fp); frames.extend([fp]*6)
    make_gif(frames,tmp/'taylor_progression.gif',duration=150)

    # 7 multivar static
    fig=plt.figure(figsize=(10,4)); ax=fig.add_subplot(121,projection='3d')
    x=np.linspace(-2,2,60); y=np.linspace(-2,2,60); X,Y=np.meshgrid(x,y); Z=0.5*X**2+0.8*Y**2
    ax.plot_surface(X,Y,Z,alpha=0.85); ax.set_title(r'$f(x,y)=0.5x^2+0.8y^2$')
    ax2=fig.add_subplot(122); xs=np.linspace(-2,2,200)
    ax2.plot(xs,0.5*xs**2,label=r'$y=0$ slice'); ax2.plot(xs,0.5+0.8*xs**2,label=r'$x=1$ slice'); ax2.legend(); ax2.grid(alpha=0.25); ax2.set_title('偏微分は切断面で考える')
    savefig(tmp/'multivar_surface_slices.png')

    # 8 gradient
    x=np.linspace(-3,3,200); y=np.linspace(-3,3,200); X,Y=np.meshgrid(x,y); Z=X**2+2*Y**2
    fig, ax=plt.subplots(figsize=(6,5)); ax.contour(X,Y,Z,levels=12)
    p=np.array([1.0,0.8]); grad=np.array([2*p[0],4*p[1]]); d=np.array([1.0,0.2]); d/=np.linalg.norm(d)
    ax.quiver(p[0],p[1],grad[0],grad[1],angles='xy',scale_units='xy',scale=6); ax.quiver(p[0],p[1],d[0],d[1],angles='xy',scale_units='xy',scale=1.5)
    ax.scatter([p[0]],[p[1]],s=50); ax.text(p[0]+0.1,p[1]+0.1,r'$\nabla f$'); ax.text(p[0]+1.0,p[1]+0.2,r'$\vec u$'); ax.set_aspect('equal'); ax.grid(alpha=0.2); ax.set_title('勾配は最も増える向き')
    savefig(tmp/'gradient_direction.png')
    frames=[]
    for k,th in enumerate(np.linspace(0,2*np.pi,24,endpoint=False)):
        d=np.array([np.cos(th),np.sin(th)]); dd=float(grad@d)
        fig, ax=plt.subplots(figsize=(5,5)); ax.contour(X,Y,Z,levels=12)
        ax.quiver(p[0],p[1],grad[0],grad[1],angles='xy',scale_units='xy',scale=6); ax.quiver(p[0],p[1],d[0],d[1],angles='xy',scale_units='xy',scale=1.5)
        ax.scatter([p[0]],[p[1]],s=40); ax.text(-2.8,2.6,rf'$D_{{\vec u}}f={dd:.2f}$'); ax.set_xlim(-3,3); ax.set_ylim(-3,3); ax.set_aspect('equal'); ax.set_title('方向を変えると方向微分が変わる')
        fp=tmp/f'gradf{k:02d}.png'; savefig(fp); frames.append(fp)
    make_gif(frames,tmp/'directional_derivative.gif')

    # 9 jacobian
    fig, axes=plt.subplots(1,2,figsize=(9,4))
    for i in range(-2,3):
        axes[0].plot([i,i],[-2,2],color='black',alpha=0.4); axes[0].plot([-2,2],[i,i],color='black',alpha=0.4)
    axes[0].set_title('入力空間の小格子')
    J=np.array([[1.4,0.5],[-0.2,1.1]])
    for i in range(-2,3):
        pts=np.array([[i,-2],[i,2]])@J.T; axes[1].plot(pts[:,0],pts[:,1],color='black',alpha=0.4)
        pts=np.array([[-2,i],[2,i]])@J.T; axes[1].plot(pts[:,0],pts[:,1],color='black',alpha=0.4)
    axes[1].set_title('Jacobian による局所線形変換')
    for ax in axes: ax.set_aspect('equal'); ax.set_xlim(-4,4); ax.set_ylim(-4,4); ax.grid(alpha=0.2)
    savefig(tmp/'jacobian_grid.png')
    frames=[]; I=np.eye(2)
    for k,t in enumerate(np.linspace(0,1,20)):
        A=(1-t)*I+t*J; fig, ax=plt.subplots(figsize=(5,5))
        for i in range(-2,3):
            pts=np.array([[i,-2],[i,2]])@A.T; ax.plot(pts[:,0],pts[:,1],color='black',alpha=0.4)
            pts=np.array([[-2,i],[2,i]])@A.T; ax.plot(pts[:,0],pts[:,1],color='black',alpha=0.4)
        ax.set_aspect('equal'); ax.set_xlim(-4,4); ax.set_ylim(-4,4); ax.set_title('線形近似で小格子が変形する')
        fp=tmp/f'jacf{k:02d}.png'; savefig(fp); frames.append(fp)
    make_gif(frames,tmp/'jacobian_grid_deform.gif')

    # 10 hessian
    x=np.linspace(-2,2,200); y=np.linspace(-2,2,200); X,Y=np.meshgrid(x,y); Z=X**2-Y**2
    fig, ax=plt.subplots(figsize=(6,5)); ax.contour(X,Y,Z,levels=12); ax.set_aspect('equal'); ax.grid(alpha=0.2); ax.set_title('鞍点の等高線')
    savefig(tmp/'hessian_contours.png')
    fig, ax = plt.subplots(figsize=(4,3)); sns.heatmap(np.array([[2,0],[0,-2]]), annot=True, cbar=False, ax=ax, fmt='.0f'); ax.set_title('Hessian 行列')
    savefig(tmp/'hessian_heatmap.png')

    # 11 multivar chain
    fig, ax=plt.subplots(figsize=(9,4)); ax.axis('off')
    nodes=[('x',0.05,0.7),('y',0.05,0.25),('u=g(x,y)',0.33,0.55),('v=h(x,y)',0.33,0.15),('z=f(u,v)',0.68,0.35)]
    for label,x0,y0 in nodes:
        ax.add_patch(Rectangle((x0,y0),0.2,0.18,fill=False,lw=2)); ax.text(x0+0.1,y0+0.09,label,ha='center',va='center',fontsize=11)
    edges=[((0.25,0.79),(0.33,0.64)),((0.25,0.34),(0.33,0.64)),((0.25,0.79),(0.33,0.24)),((0.25,0.34),(0.33,0.24)),((0.53,0.64),(0.68,0.44)),((0.53,0.24),(0.68,0.44))]
    for src,dst in edges: ax.add_patch(FancyArrowPatch(src,dst,arrowstyle='->',mutation_scale=14,lw=1.7))
    ax.text(0.18,-0.02,r'$\dfrac{\partial z}{\partial x}=\dfrac{\partial z}{\partial u}\dfrac{\partial u}{\partial x}+\dfrac{\partial z}{\partial v}\dfrac{\partial v}{\partial x}$',fontsize=14)
    savefig(tmp/'multivar_chain_graph.png')

    # 12 unconstrained optimization
    x=np.linspace(-3,3,200); y=np.linspace(-3,3,200); X,Y=np.meshgrid(x,y); Z=(X-1.2)**2+2*(Y+0.8)**2
    fig, ax=plt.subplots(figsize=(6,5)); ax.contour(X,Y,Z,levels=14)
    p=np.array([-2.5,2.2],dtype=float); gd=[p.copy()]
    for _ in range(8):
        grad=np.array([2*(p[0]-1.2),4*(p[1]+0.8)]); p=p-0.18*grad; gd.append(p.copy())
    gd=np.array(gd)
    ax.plot(gd[:,0],gd[:,1],'-o',label='Gradient Descent'); ax.scatter([1.2],[-0.8],s=60); ax.legend(); ax.set_aspect('equal'); ax.grid(alpha=0.2); ax.set_title('等高線上の反復点')
    savefig(tmp/'unconstrained_paths.png')
    p=np.array([-2.5,2.2],dtype=float); q=np.array([-2.5,2.2],dtype=float); gd=[p.copy()]; nw=[q.copy()]
    for _ in range(7):
        grad=np.array([2*(p[0]-1.2),4*(p[1]+0.8)]); p=p-0.18*grad; gd.append(p.copy())
        grad2=np.array([2*(q[0]-1.2),4*(q[1]+0.8)]); H=np.array([[2,0],[0,4]]); q=q-np.linalg.solve(H,grad2); nw.append(q.copy())
    frames=[]
    for k in range(1,len(gd)+1):
        fig, ax=plt.subplots(figsize=(5,5)); ax.contour(X,Y,Z,levels=14)
        g=np.array(gd[:k]); n=np.array(nw[:k]); ax.plot(g[:,0],g[:,1],'-o',label='GD'); ax.plot(n[:,0],n[:,1],'-o',label='Newton')
        ax.scatter([1.2],[-0.8],s=60); ax.legend(); ax.set_aspect('equal'); ax.set_xlim(-3,3); ax.set_ylim(-3,3); ax.set_title('最適化アルゴリズムの軌跡')
        fp=tmp/f'optf{k:02d}.png'; savefig(fp); frames.append(fp)
    make_gif(frames,tmp/'optimization_trajectories.gif',duration=180)

    # 13 Lagrange
    t=np.linspace(0,2*np.pi,300); cx,cy=np.cos(t),np.sin(t); x=np.linspace(-1.4,1.4,250); y=np.linspace(-1.4,1.4,250); X,Y=np.meshgrid(x,y); Z=X+0.5*Y
    fig, ax=plt.subplots(figsize=(6,5)); ax.contour(X,Y,Z,levels=10); ax.plot(cx,cy,lw=2); opt=np.array([2/np.sqrt(5),1/np.sqrt(5)]); ax.scatter([opt[0]],[opt[1]],s=60); ax.text(opt[0]+0.05,opt[1]+0.05,'接点'); ax.set_aspect('equal'); ax.grid(alpha=0.2); ax.set_title('制約曲線と等高線が接する点')
    savefig(tmp/'lagrange_touch.png')
    frames=[]
    for k,c in enumerate(np.linspace(-1.2,1.2,24)):
        fig, ax=plt.subplots(figsize=(5,5)); ax.plot(cx,cy,lw=2); ax.contour(X,Y,Z,levels=[c],linewidths=2); ax.set_xlim(-1.4,1.4); ax.set_ylim(-1.4,1.4); ax.set_aspect('equal'); ax.set_title('等高線を平行移動すると最初の接点が最適')
        fp=tmp/f'lagf{k:02d}.png'; savefig(fp); frames.append(fp)
    make_gif(frames,tmp/'lagrange_levels.gif')

    copy_assets(tmp)
    shutil.rmtree(tmp)

# ---------- content ----------
topics = [
    {
        'id':'calc-functions-limits-continuity','title':'関数・極限・連続','question':'入力が点 $a$ に近づくとき、出力はどこへ近づくのか。',
        'goal':['極限の定義と左右極限の違いを説明する','連続性を $\\lim_{x\\to a}f(x)=f(a)$ で判定する','不連続の典型例を区別する'],
        'assets':['limits_continuity.png','limits_approach.gif'],
        'core':['関数は入力に対して出力を返す規則である。','極限は点そのものより、近づいたときの振る舞いを見る概念である。','連続性は「近づく先」と「実際の値」が一致していること。'],
        'formula':'$\\lim_{x\\to a} f(x)=L$, 連続性は $\\lim_{x\\to a}f(x)=f(a)$',
        'example':'$f(x)=\\sin x$ はどの点でも連続。一方、$g(x)=\\begin{cases}-1&(x<0)\\\\1&(x\\ge0)\\end{cases}$ は $x=0$ で不連続。',
        'pitfall':['$x=a$ を代入できることと、極限が存在することは同じではない。','左右極限が一致しなければ極限は存在しない。'],
        'connection':'機械学習では、損失関数や活性化関数の連続性が最適化の安定性に関わる。'
    },
    {
        'id':'calc-derivatives-rates','title':'微分と変化率','question':'平均変化率の極限として、瞬間の変化率をどう定義するか。',
        'goal':['平均変化率と瞬間変化率の違いを説明する','導関数の定義式から簡単な微分を計算する','接線の傾きとして微分を解釈する'],
        'assets':['derivative_secant_tangent.png','secant_to_tangent.gif'],
        'core':['平均変化率は2点間の割線の傾き。','微分係数は割線の傾きの極限として定義される。','導関数は各点での瞬間変化率を与える。'],
        'formula':"$f'(x)=\\lim_{h\\to0}\\dfrac{f(x+h)-f(x)}{h}$",
        'example': "$f(x)=x^2$ では $f\'(x)=2x$。$x=1$ で接線の傾きは 2。",
        'pitfall':['$h=0$ を直接代入してはいけない。','接線は1点で触れる直線であり、曲線そのものではない。'],
        'connection':'勾配法では、どちらへ動けば損失が減るかを微分が教える。'
    },
    {
        'id':'calc-differentiation-rules-chain-rule','title':'微分法則と一変数の連鎖律','question':'積・商・合成関数の微分を、毎回定義からやらずにどう計算するか。',
        'goal':['和・積・商の微分法則を使う','連鎖律を合成関数の依存関係として理解する','計算の順序を説明できる'],
        'assets':['chain_rule_flow.png'],
        'core':['微分法則は複雑な関数を小さな部品へ分解する道具。','連鎖律は内側の変化が外側へ伝わることを式にしたもの。','合成の順番を意識するとミスが減る。'],
        'formula': r"$\dfrac{d}{dx}f(g(x)) = f'(g(x))g'(x)$",
        'example': r"$y=\sin(x^2+1)$ なら $y'=\cos(x^2+1)\cdot 2x$。",
        'pitfall':['外側だけ・内側だけを微分して終わらない。','連鎖律は掛け算になる。足し算ではない。'],
        'connection':'逆伝播は多変数版の連鎖律そのもの。'
    },
    {
        'id':'calc-one-variable-optimization','title':'一変数の最適化','question':'関数の山や谷は、導関数を使ってどう見つけるか。',
        'goal':['停留点を候補として見つける','1次導関数・2次導関数による判定を説明する','端点の確認も含めて最適値を求める'],
        'assets':['onevar_optimization.png'],
        'core':['最適化ではまず増減が止まる点を探す。','ただし停留点が常に極値とは限らない。','閉区間なら端点も候補。'],
        'formula': "候補点は $f\'(x)=0$ または微分不能点。判定には $f\''(x)$ を使う。",
        'example':'$f(x)=x^3-3x$ は $x=\\pm1$ が停留点。$x=-1$ は極大、$x=1$ は極小。',
        'pitfall':['停留点と最適点を同一視しない。','開区間と閉区間で端点の扱いが違う。'],
        'connection':'損失関数最小化の最も単純な原型。'
    },
    {
        'id':'calc-integrals-fundamental-theorem','title':'積分と微積分学の基本定理','question':'面積の蓄積と微分は、なぜ互いに逆操作になるのか。',
        'goal':['Riemann和の意味を説明する','定積分を累積量として解釈する','微積分学の基本定理の2つの顔を理解する'],
        'assets':['integral_riemann.png','integral_accumulation.gif'],
        'core':['積分は細かく足し合わせる操作。','累積面積関数 $A(x)$ を微分すると元の関数へ戻る。','原始関数と定積分の値がつながる。'],
        'formula': r"$A(x)=\int_a^x f(t)\,dt$, then $A'(x)=f(x)$",
        'example':'$\\int_0^1 2x\\,dx = [x^2]_0^1 =1$。',
        'pitfall':['積分は単なる原始関数探しではない。','定積分の値は符号付き面積として考える。'],
        'connection':'確率密度の累積分布関数や連続時間モデルの累積量に直結する。'
    },
    {
        'id':'calc-taylor-approximation','title':'Taylor展開と局所近似','question':'難しい関数を、近くでは簡単な多項式でどこまで近似できるか。',
        'goal':['1次・2次・高次Taylor近似の意味を説明する','展開点の近くで近似が良い理由を理解する','剰余項の役割を知る'],
        'assets':['taylor_orders.png','taylor_progression.gif'],
        'core':['Taylor展開は、その点で値と微分を揃えた多項式。','次数を上げるほど局所的にはよく近似する。','展開点から離れると近似の限界が見える。'],
        'formula': r"$f(x)\approx f(a)+f'(a)(x-a)+\dfrac{f''(a)}{2}(x-a)^2+\cdots$",
        'example':'$e^x$ を $a=0$ で展開すると $1+x+x^2/2+\\cdots$。',
        'pitfall':['展開点から遠いところでは近似が急に悪くなる。','次数を上げれば常に全域で良くなるわけではない。'],
        'connection':'Newton法、二次近似、最適化アルゴリズムの基礎。'
    },
    {
        'id':'calc-multivariable-functions-partial-derivatives','title':'多変数関数と偏微分','question':'2変数以上の関数では、変化率をどう方向ごとに分けて考えるか。',
        'goal':['多変数関数を入力空間と出力空間で捉える','偏微分を一方向だけ動かす変化率として説明する','切断面との対応を理解する'],
        'assets':['multivar_surface_slices.png'],
        'core':['多変数関数は多次元の入力から出力を返す。','偏微分では他の変数を固定して1方向だけ見る。','3Dの曲面と2Dの切断面を往復して理解する。'],
        'formula':'$\\dfrac{\\partial f}{\\partial x}(a,b)=\\lim_{h\\to0}\\dfrac{f(a+h,b)-f(a,b)}{h}$',
        'example':'$f(x,y)=x^2+xy$ なら $\\partial f/\\partial x=2x+y$, $\\partial f/\\partial y=x$。',
        'pitfall':['偏微分は全体の変化ではない。','何を固定するかを曖昧にしない。'],
        'connection':'特徴量が多いモデルでは、各入力成分の感度を偏微分が表す。'
    },
    {
        'id':'calc-gradient-directional-derivative','title':'勾配と方向微分','question':'どの方向へ動かすと一番増えるのか。任意方向の変化率はどう求めるか。',
        'goal':['方向微分を単位ベクトルとの内積として書く','勾配が最急上昇方向であると理解する','等高線図と結びつける'],
        'assets':['gradient_direction.png','directional_derivative.gif'],
        'core':['方向微分はその方向へ一歩進んだときの増え方。','勾配ベクトルは最も増加する方向を指す。','等高線図では勾配は等高線に直交する。'],
        'formula':'$D_{\\mathbf u}f(\\mathbf x)=\\nabla f(\\mathbf x)^\\top \\mathbf u$',
        'example':'$f(x,y)=x^2+2y^2$、点 $(1,1)$ では $\\nabla f=(2,4)$。',
        'pitfall':['方向ベクトルは単位長さに正規化して考える。','勾配そのものは方向微分の値ではない。'],
        'connection':'gradient descent は勾配の反対向きへ進む手法。'
    },
    {
        'id':'calc-total-derivative-jacobian','title':'全微分とJacobian','question':'多変数関数をある点の近くで線形に近似すると、何が見えるか。',
        'goal':['全微分を線形写像として解釈する','Jacobianが局所線形近似の係数行列であると理解する','小変位がどう伝わるかを説明する'],
        'assets':['jacobian_grid.png','jacobian_grid_deform.gif'],
        'core':['全微分は十分小さい変化に対する一次近似。','Jacobianはベクトル値関数の微分係数を並べた行列。','小さな格子の変形として見ると直感的。'],
        'formula':'$f(\\mathbf x+\\Delta \\mathbf x)\\approx f(\\mathbf x)+J_f(\\mathbf x)\\Delta \\mathbf x$',
        'example':'$f(x,y)=(x+y,xy)$ の Jacobian は $\\begin{bmatrix}1&1\\\\y&x\\end{bmatrix}$。',
        'pitfall':['Jacobianは厳密な変換ではなく局所近似。','行と列の意味を混同しない。'],
        'connection':'逆伝播、誤差伝播、線形化モデルで中心的。'
    },
    {
        'id':'calc-hessian-second-order','title':'Hessianと二次近似','question':'曲率まで使うと、局所形状をどうより正確に捉えられるか。',
        'goal':['Hessian行列の意味を説明する','二次近似と極値判定を結びつける','正定値・不定値と形状の関係を知る'],
        'assets':['hessian_contours.png','hessian_heatmap.png'],
        'core':['Hessianは二階偏微分を集めた行列。','二次近似は曲率を含むので一次近似より豊か。','正定値・不定値が局所形状を区別する。'],
        'formula':'$f(\\mathbf x+\\Delta)\\approx f(\\mathbf x)+\\nabla f(\\mathbf x)^\\top\\Delta+\\tfrac12\\Delta^\\top H_f(\\mathbf x)\\Delta$',
        'example':'$f(x,y)=x^2-y^2$ の Hessian は $\\begin{bmatrix}2&0\\\\0&-2\\end{bmatrix}$ で鞍点。',
        'pitfall':['Hessianがあるだけで極小と決めつけない。','二階偏微分の対称性には条件がある。'],
        'connection':'Newton法、二次計画、曲率補正つき最適化に直結。'
    },
    {
        'id':'calc-multivariable-chain-rule','title':'多変数の連鎖律','question':'複数の中間変数を通る依存関係では、微分をどう組み立てるか。',
        'goal':['計算グラフで依存関係を追う','偏微分の和として連鎖律を書く','Jacobian積として整理する'],
        'assets':['multivar_chain_graph.png'],
        'core':['多変数の連鎖律は経路ごとの寄与を足し合わせる規則。','行列で書くと計算が見通しやすい。','逆伝播への橋渡しになる。'],
        'formula':'$\\dfrac{\\partial z}{\\partial x}=\\dfrac{\\partial z}{\\partial u}\\dfrac{\\partial u}{\\partial x}+\\dfrac{\\partial z}{\\partial v}\\dfrac{\\partial v}{\\partial x}$',
        'example':'$z=f(u,v),\\;u=g(x,y),\\;v=h(x,y)$ の依存関係を図で追う。',
        'pitfall':['経路の足し忘れに注意。','スカラー式と行列表記の対応を曖昧にしない。'],
        'connection':'ニューラルネットの逆伝播は計算グラフ上の多変数連鎖律。'
    },
    {
        'id':'calc-unconstrained-optimization','title':'多変数の制約なし最適化','question':'等高線上をどのように進むと目的関数を効率よく減らせるか。',
        'goal':['最適化を勾配・Hessianと結びつける','gradient descent と Newton法の違いを説明する','停留点の分類を理解する'],
        'assets':['unconstrained_paths.png','optimization_trajectories.gif'],
        'core':['多変数でも候補は $\\nabla f=0$。','勾配法は一次情報、Newton法は二次情報を使う。','軌跡を比べるとアルゴリズムの性格が見えやすい。'],
        'formula':'Gradient descent: $\\mathbf x_{k+1}=\\mathbf x_k-\\eta\\nabla f(\\mathbf x_k)$',
        'example':'楕円形の等高線では、GDはジグザグ、Newton法は少ない手数で近づくことがある。',
        'pitfall':['学習率が大きすぎると発散しうる。','停留点は鞍点かもしれない。'],
        'connection':'機械学習の学習アルゴリズムの基礎。'
    },
    {
        'id':'calc-lagrange-multipliers','title':'Lagrange乗数法','question':'制約つきで最適化するとき、なぜ勾配が平行になるのか。',
        'goal':['制約付き最適化の幾何学を説明する','Lagrange関数を立てる','勾配平行条件の意味を理解する'],
        'assets':['lagrange_touch.png','lagrange_levels.gif'],
        'core':['制約つき最適化では自由に好きな方向へ動けない。','最適点では目的関数の勾配が制約の法線方向と揃う。','等高線の接触として見ると理解しやすい。'],
        'formula':'$\\nabla f(\\mathbf x)=\\lambda\\nabla g(\\mathbf x),\\quad g(\\mathbf x)=c$',
        'example':'単位円上で $f(x,y)=x+0.5y$ を最大化する。',
        'pitfall':['制約式も必ず連立に含める。','勾配が等しいのではなく平行。'],
        'connection':'KKT条件や制約付き学習問題の入口になる。'
    },
]

def bullets(items):
    return '\n'.join(f'- {x}' for x in items)

def slide_md(t):
    imgs=t['assets']; img1=f'./assets/course-01/{imgs[0]}' if imgs else ''; img2=f'./assets/course-01/{imgs[1]}' if len(imgs)>1 else ''
    sections=[
f"""---
theme: default
routerMode: hash
layout: cover
title: {t['title']}
---

# {t['title']}

**Course 01 / Calculus**

- 今回の問い: {t['question']}
- 図解とアニメーションを使って、式と直感をつなぐ。""",
f"""---
# 1. 今回の到達目標

{bullets(t['goal'])}""",
f"""---
# 2. まず直感をつかむ

{bullets(t['core'])}

> 「何を固定し、何を動かしているか」を常に意識する。""",
f"""---
# 3. 図で見る

![]({img1})

- 先に図を理解すると、定義の読み方が楽になる。""",
f"""---
# 4. 数学的な定義

{t['formula']}

- 記号の意味を一つずつ対応させて読む。
- 定義は何を近似しているかを明示している。""",
f"""---
# 5. 小さな例

{t['example']}

- 記号操作より、何を主張したいかに注目する。""",
f"""---
# 6. 動きで確認

{f'<img src="{img2}" alt="animation" style="max-height: 310px; width: auto; margin: 0.4rem auto 0.6rem;" />' if img2 else '（このTopicでは静止図を中心に理解する）'}

- 極限・接線・累積・反復は、動かして見ると理解しやすい。""",
f"""---
# 7. よくある誤解

{bullets(t['pitfall'])}""",
f"""---
# 8. 機械学習・数値計算との接続

- {t['connection']}
- このTopicは、後の最適化・線形代数・統計で何度も再登場する。""",
f"""---
# 9. 理解チェック

1. このTopicで「入力」「出力」「変化率」は何か。
2. 公式は何を計算しているのか。
3. 図のどの部分が定義や定理に対応しているか。""",
f"""---
# 10. まとめ

- 重要語: **{t['title']}**
- 中心式: {t['formula']}
- 図と式を対応づけて説明できるようになれば次へ進める。""",
f"""---
# 11. つづきを学ぶ

- [教科書](/textbook/{t['id']})
- [演習](/exercises/{t['id']})

> 演習では、図を見てから式を書く順番を意識する。"""
    ]
    return '\n\n'.join(sections)+'\n'

def textbook_md(t):
    imgs=t['assets']; parts=[]
    parts.append(f"# {t['title']}\n")
    parts.append('## このTopicで考える問い\n')
    parts.append(t['question']+'\n')
    parts.append('## 学習目標\n')
    parts.append(bullets(t['goal'])+'\n')
    parts.append('## まず直感\n')
    parts.append(bullets(t['core'])+'\n')
    parts.append('数学の定義に入る前に、**どの量を固定し、どの量を動かしているか** を言葉で確認すると理解しやすくなる。\n')
    parts.append('## 図解\n')
    parts.append(f"![図解1](/visuals/course-01/{imgs[0]})\n")
    parts.append('### 図を見るポイント\n')
    parts.append('- 図の横軸・縦軸が何を表しているかを確認する。\n- 変化している量と固定している量を区別する。\n- 式の各記号が図のどこに対応するかを探す。\n')
    if len(imgs)>1:
        parts.append('## アニメーションで確認\n')
        parts.append(f"![アニメーション](/visuals/course-01/{imgs[1]})\n")
        parts.append('### アニメーションを見るポイント\n')
        parts.append('- 静止図から何が変化しているかを確認する。\n- 動いている量を、中心式の記号と対応づける。\n')
    parts.append('## 数学的な定義・中心式\n')
    parts.append(t['formula']+'\n')
    parts.append('この式は単なる計算規則ではなく、**何をどう近似しているか** を表している。\n')
    parts.append('## 小さな例\n')
    parts.append(t['example']+'\n')
    parts.append('例を読むときは、1. 入力は何か 2. 出力は何か 3. どの量の変化を見ているか、を順に確認する。\n')
    parts.append('## よくある誤解\n')
    parts.append(bullets(t['pitfall'])+'\n')
    parts.append('## 機械学習・数値計算との接続\n')
    parts.append(t['connection']+'\n')
    parts.append('Course 01の内容は、後の線形代数・最適化・機械学習で何度も再登場する。\n')
    parts.append('## 最後に確認したいこと\n')
    parts.append('- 中心式を日本語で説明できるか。\n- 図のどの部分が式の各項に対応するか。\n- どの場面でこの概念が必要になるか。\n')
    parts.append('## 次へ\n')
    parts.append(f"- [スライド](/slides/{t['id']}/)\n- [演習](/exercises/{t['id']})\n")
    return '\n'.join(parts)

def write_materials():
    for t in topics:
        (slide_dir/f"{t['id']}.md").write_text(slide_md(t), encoding='utf-8')
        (portal_textbook_dir/f"{t['id']}.md").write_text(textbook_md(t), encoding='utf-8')

def write_generator_stub():
    # A simple reproducibility script note.
    (visual_tools_dir/'README.md').write_text('# Course 01 visuals\n\nGenerated with matplotlib and seaborn.\nRun `python tools/course01-visuals/generate_all.py` to regenerate assets.\n', encoding='utf-8')
    # Save this builder as the generator implementation for reuse.
    src = Path('/mnt/data/build_course01_overlay.py')
    if src.exists():
        shutil.copy2(src, visual_tools_dir/'generate_all.py')

def write_readme():
    asset_count = len(list(slide_asset_dir.glob('*')))
    text = textwrap.dedent(f"""
    # Course 01 refined overlay

    This overlay improves **Course 01 only**.

    Included:
    - 13 Slidev decks under `apps/slides/decks/`
    - 13 textbook pages under `apps/portal/textbook/`
    - matplotlib / seaborn generated PNG and GIF assets under both slide and portal asset locations
    - reproducible visual generator under `tools/course01-visuals/generate_all.py`

    Asset count: {asset_count}

    Representative topics:
    - calc-functions-limits-continuity
    - calc-derivatives-rates
    - calc-integrals-fundamental-theorem
    - calc-unconstrained-optimization
    - calc-lagrange-multipliers
    """)
    (ROOT/'README.md').write_text(text, encoding='utf-8')

def zip_overlay():
    zpath = Path('/mnt/data/course01-refined-overlay.zip')
    if zpath.exists(): zpath.unlink()
    with zipfile.ZipFile(zpath,'w',zipfile.ZIP_DEFLATED) as z:
        for p in sorted(ROOT.rglob('*')):
            if p.is_file():
                z.write(p, p.relative_to(ROOT))
    return zpath

if __name__ == '__main__':
    generate_visuals()
    write_materials()
    write_generator_stub()
    write_readme()
    z = zip_overlay()
    print('ZIP', z)
    print('slides', len(list(slide_dir.glob('calc-*.md'))))
    print('textbooks', len(list(portal_textbook_dir.glob('calc-*.md'))))
    print('assets', len(list(slide_asset_dir.glob('*'))))
