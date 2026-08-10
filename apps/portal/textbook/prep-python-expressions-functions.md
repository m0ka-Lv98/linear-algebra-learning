# Pythonの式・変数・関数：教科書

Course 00｜学習準備

## このTopicの目的

数学上の式をPythonへ写すとき、値・型・副作用・例外を区別し、検算可能な小さな関数として実装するにはどうするか。

## 図の意味

<img src="/visuals/course-00/prep-python-expressions-functions.png" alt="Pythonの式・変数・関数の図解" style="max-height: 480px; display:block; margin:0 auto;" />

input xがPython関数 `def f(x): ...` に入りreturn valueへ出る。数学関数と違い、実装にはdtype、有限精度、例外、mutable stateなど追加要素があるため、同じ数式でも実装上の振る舞いが変わり得る。

## 定義から順に理解する

式 `y = 2*x + 1` では右辺を先に評価し、その結果を名前yへbindする。Python変数は数学の未知数ではなくobjectへの名前。

関数は入力parameterとreturnを明示する。純粋関数に近づけると同じ入力に同じ出力が得られ、数学との対応とtestが容易になる。

整数 `/` はfloating division、`//` はfloor division。`**` が累乗で `^` はbitwise XOR。

## name bindingと数学の等号は違う

Pythonの

```python
x = x + 1
```

は数学の方程式 $x=x+1$ ではない。右辺の現在値を計算し、その結果へname `x` を付け直すassignmentである。コードを数式へ翻訳するとき、`=` を「等しい」と機械的に読まない。

## mutable objectと副作用

```python
def add_one(xs):
    xs.append(1)
```

はreturn valueがなくても入力listそのものを書き換える。NumPy配列でもviewへ代入すると元配列が変わる場合がある。数学関数に近い推論をしたいコードでは、入力を書き換えるか、新しい値を返すかを明示する。

## floating pointと例外

`1/0` は例外だが、NumPyでは演算によって `inf` や `nan` が生成され処理が続く場合もある。結果だけを見るのではなく、`np.isfinite` やwarningを確認する。

## 小さい関数をtestする

たとえば

```python
def affine(x, a, b):
    return a*x + b
```

なら `affine(0,a,b)==b`、`affine(1,a,b)==a+b` という境界的な入力を使える。実装前に数式から期待結果を作り、その後コードを実行する順にすると「コードを答え合わせの根拠にする」循環を避けられる。

## 具体例

`def square_plus_one(x): return x**2 + 1` にx=3なら10。`3^2` は1であり9ではないため、演算子の意味を確認する。

## 条件を外すと

global listを書き換える関数は、同じ入力でも呼び出し回数で結果やstateが変わる。数学関数と同一視しない。

## 後続Courseでどう使うか

NumPy、数値実験、ML training codeの再現性へ続く。

[演習へ](/exercises/prep-python-expressions-functions)　|　[スライドへ](/slides/prep-python-expressions-functions/)
