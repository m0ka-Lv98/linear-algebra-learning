# NumPy配列・shape・indexing：教科書

Course 00｜学習準備

## このTopicの目的

配列の値だけでなくshape・axis・dtypeを追い、indexingや行列積の結果shapeを実行前に予測するにはどうするか。

## 図の意味

<img src="/visuals/course-00/prep-numpy-arrays-shapes.png" alt="NumPy配列・shape・indexingの図解" style="max-height: 480px; display:block; margin:0 auto;" />

同じ値1,2,3でも `(3,)`、`(3,1)`、`(1,3)` の3形状を並べる。1次元vector、3×1列行列、1×3行行列は見た目の値が同じでも `@` やbroadcastingの結果が違う。

## 定義から順に理解する

`ndim` は配列のaxis数、`shape` は各axisの長さ、`size` は全要素数。shape `(2,3,4)` ならndim=3, size=24。

`A[:,1]` はaxisを1本落として `(m,)` になるが、`A[:,1:2]` は `(m,1)` を保つ。1D arrayの `.T` はshapeを変えない。

`A*B` はelementwise、`A@B` はmatrix multiplication。broadcastingは末尾axisから長さが一致するか1である場合に拡張する。

## indexingでaxisが消えるかを予測する

$A$ がshape `(2,3)` なら `A[0, :]` は整数indexで第0 axisを1点へ固定するためshape `(3,)`。`A[0:1, :]` はsliceなので長さ1のaxisを保持し `(1,3)`。値が同じに見えても後続のbroadcastingと`@`が変わる。

1D array `x.shape==(3,)` に対して `x.T` を取っても `(3,)` のまま。数学上の行ベクトル/列ベクトルを明示したいなら `x.reshape(1,3)` または `x.reshape(3,1)` とする。

## broadcastingの規則を末尾axisから読む

2つのshapeを右から比較し、各axisで

- 長さが等しい、または
- 片方が1

ならbroadcast可能。たとえば `(5,3)` と `(3,)` は `(5,3)` とみなして各rowへ同じ3-vectorを足せる。一方 `(5,3)` と `(5,)` は末尾3と5が一致せずbroadcastできない。

## matrix multiplicationのshape

`A.shape=(m,n)`, `B.shape=(n,p)` なら `A @ B` は `(m,p)`。一方 `A * B` はelementwise productなのでbroadcasting規則を使う。数式の $\mathbf A\mathbf B$ をPythonへ写すとき `*` と `@` を混同しない。

## viewとcopy

sliceやreshapeは元memoryを共有するviewを返す場合がある。

```python
A = np.arange(6).reshape(2,3)
b = A[:, 0]
b[0] = 99
```

では `A` も変わる可能性がある。独立な配列が必要なら `.copy()` を明示する。数学の「新しいベクトルを定義した」という感覚とmemory aliasingは別問題である。

## axisを「縦・横」だけで覚えない

`np.sum(A, axis=0)` は第0 axisを潰す操作。shape `(2,3)` なら結果 `(3,)`。高次元で「縦」という言葉は曖昧になるので、**どのaxisをreduceし、そのaxisが結果から消えるか**で理解する。`keepdims=True` なら長さ1として残せる。

## 具体例

A.shape=(2,3), B.shape=(3,4)なら `A@B` は(2,4)。A[:,1]は(2,), A[:,1:2]は(2,1)。

## 条件を外すと

reshapeは要素数を保つだけでaxisの意味を理解しない。sample axisとfeature axisを誤って入れ替えてもエラーにならないことがある。

## 後続Courseでどう使うか

Course02の行列shape、Course08/09のbatch×feature×channelを読む基礎。

[演習へ](/exercises/prep-numpy-arrays-shapes)　|　[スライドへ](/slides/prep-numpy-arrays-shapes/)
