import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { parse, stringify } from 'yaml'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const topicFile = path.join(root, 'content/topics.yml')

const planned = [
  ['mat-gram-matrix', 'Gram matrix', 'linear-algebra-core'], ['stat-fisher-information-matrix', 'Fisher information matrix', 'statistics-estimation'],
  ['stat-estimator-covariance', 'Estimator covariance', 'statistics-estimation'], ['stat-vif-collinearity', 'VIF and collinearity', 'statistics-estimation'],
  ['stat-wls-fisher-information', 'WLS Fisher information', 'statistics-estimation'], ['stat-model-misspecification', 'Model misspecification', 'statistics-estimation'],
  ['mat-scalar-by-vector-derivative', 'Scalar-by-vector derivative', 'matrix-calculus-differentiation'], ['mat-vector-by-vector-derivative', 'Vector-by-vector derivative', 'matrix-calculus-differentiation'],
  ['mat-scalar-by-matrix-derivative', 'Scalar-by-matrix derivative', 'matrix-calculus-differentiation'], ['mat-vector-by-matrix-derivative', 'Vector-by-matrix derivative', 'matrix-calculus-differentiation'],
  ['mat-matrix-differential', 'Matrix differential', 'matrix-calculus-differentiation'], ['mat-trace-trick', 'Trace trick', 'matrix-calculus-differentiation'],
  ['mat-quadratic-form-derivatives', 'Quadratic form derivatives', 'matrix-calculus-differentiation'], ['mat-inverse-matrix-derivative', 'Inverse matrix derivative', 'matrix-calculus-differentiation'],
  ['mat-log-determinant-derivative', 'Log-determinant derivative', 'matrix-calculus-differentiation'], ['mat-matrix-chain-rule', 'Matrix chain rule', 'matrix-calculus-differentiation'],
  ['mat-jacobian-vector-product', 'Jacobian-vector product', 'matrix-calculus-differentiation'], ['mat-vector-jacobian-product', 'Vector-Jacobian product', 'matrix-calculus-differentiation'],
  ['mat-automatic-differentiation', 'Automatic differentiation', 'matrix-calculus-differentiation'], ['mat-forward-mode-ad', 'Forward-mode AD', 'matrix-calculus-differentiation'],
  ['mat-reverse-mode-ad', 'Reverse-mode AD', 'matrix-calculus-differentiation'], ['mat-vec-operator', 'vec operator', 'matrix-calculus-differentiation'], ['mat-kronecker-product', 'Kronecker product', 'matrix-calculus-differentiation'],
  ['prob-bernoulli-distribution', 'Bernoulli distribution', 'probability-discrete-distributions'], ['prob-binomial-distribution', 'Binomial distribution', 'probability-discrete-distributions'],
  ['prob-poisson-distribution', 'Poisson distribution', 'probability-discrete-distributions'], ['prob-gaussian-distribution', 'Gaussian distribution', 'probability-continuous-distributions'],
  ['prob-log-normal-distribution', 'Log-normal distribution', 'probability-continuous-distributions'], ['prob-student-t-distribution', 'Student t distribution', 'probability-continuous-distributions'],
  ['prob-dirichlet-distribution', 'Dirichlet distribution', 'probability-continuous-distributions'], ['prob-gaussian-mixture', 'Gaussian mixture', 'probability-continuous-distributions'],
  ['prob-generating-functions', 'Probability generating function', 'probability-processes'], ['prob-moment-generating-functions', 'Moment generating function', 'probability-processes'],
  ['prob-characteristic-functions', 'Characteristic function', 'probability-processes'], ['prob-random-walk', 'Random walk', 'probability-processes'], ['prob-markov-chains', 'Markov chain', 'probability-processes'],
  ['prob-poisson-process', 'Poisson process', 'probability-processes'], ['prob-brownian-motion', 'Brownian motion', 'probability-processes'], ['prob-gaussian-process', 'Gaussian process', 'probability-processes'],
  ['prob-stationarity-autocorrelation', 'Stationarity and autocorrelation', 'probability-processes'], ['stat-cramer-rao-lower-bound', 'Cramér–Rao lower bound', 'statistics-estimation'],
  ['stat-observed-information', 'Observed information', 'statistics-estimation'], ['stat-identifiability', 'Identifiability', 'statistics-estimation'], ['stat-delta-method', 'Delta method', 'statistics-estimation'],
  ['stat-error-propagation', 'Error propagation', 'statistics-estimation'], ['stat-sufficient-statistics', 'Sufficient statistics', 'statistics-estimation'], ['stat-exponential-family', 'Exponential family', 'statistics-estimation'],
  ['stat-generalized-linear-models', 'Generalized linear models', 'statistics-estimation'], ['stat-poisson-regression', 'Poisson regression', 'statistics-estimation'], ['stat-covariance-estimation', 'Covariance estimation', 'statistics-estimation'],
  ['stat-experimental-design', 'Experimental design', 'statistics-estimation'], ['stat-optimal-experimental-design', 'Optimal experimental design', 'statistics-estimation'], ['stat-sandwich-covariance', 'Sandwich covariance', 'statistics-estimation'],
  ['sig-continuous-time-signals', 'Continuous-time signals', 'signals-fourier-analysis'], ['sig-discrete-time-signals', 'Discrete-time signals', 'signals-fourier-analysis'],
  ['sig-impulse-step', 'Impulse and step signals', 'signals-fourier-analysis'], ['sig-lti-systems', 'LTI systems', 'signals-fourier-analysis'], ['sig-impulse-response', 'Impulse response', 'signals-fourier-analysis'],
  ['sig-convolution', 'Convolution', 'signals-fourier-analysis'], ['sig-correlation', 'Correlation', 'signals-fourier-analysis'], ['sig-autocorrelation', 'Autocorrelation', 'signals-fourier-analysis'],
  ['sig-fourier-series', 'Fourier series', 'signals-fourier-analysis'], ['sig-fourier-transform', 'Continuous Fourier transform', 'signals-fourier-analysis'], ['sig-convolution-theorem', 'Convolution theorem', 'signals-fourier-analysis'],
  ['sig-parseval-theorem', 'Parseval theorem', 'signals-fourier-analysis'], ['sig-dft', 'Discrete Fourier transform', 'signals-fourier-analysis'], ['sig-fft', 'Fast Fourier transform', 'signals-fourier-analysis'],
  ['sig-sampling-theorem-aliasing', 'Sampling theorem and aliasing', 'signals-fourier-analysis'], ['sig-stft-spectrogram', 'STFT and spectrogram', 'signals-fourier-analysis'], ['sig-laplace-transform', 'Laplace transform', 'signals-fourier-analysis'],
  ['ode-first-order', 'First-order ODE', 'differential-equations-core'], ['ode-second-order', 'Second-order ODE', 'differential-equations-core'], ['ode-systems', 'Systems of ODE', 'differential-equations-core'],
  ['ode-matrix-exponential', 'Matrix exponential', 'differential-equations-core'], ['ode-phase-plane-stability', 'Phase plane and stability', 'differential-equations-core'], ['ode-boundary-value-problems', 'Boundary value problems', 'differential-equations-core'],
  ['pde-classification', 'PDE classification', 'differential-equations-core'], ['pde-heat-equation', 'Heat equation', 'differential-equations-core'], ['pde-wave-equation', 'Wave equation', 'differential-equations-core'],
  ['pde-laplace-equation', 'Laplace equation', 'differential-equations-core'], ['pde-green-functions', 'Green functions', 'differential-equations-core'], ['pde-eigenfunction-expansion', 'Eigenfunction expansion', 'differential-equations-core'],
  ['complex-analytic-functions', 'Analytic functions', 'complex-analysis-core'], ['complex-cauchy-riemann', 'Cauchy–Riemann equations', 'complex-analysis-core'], ['complex-contour-integration', 'Contour integration', 'complex-analysis-core'],
  ['complex-residue-theorem', 'Residue theorem', 'complex-analysis-core'], ['num-backward-error-analysis', 'Backward error analysis', 'numerical-analysis-core'], ['num-chebyshev-approximation', 'Chebyshev approximation', 'numerical-analysis-core'],
  ['num-adaptive-quadrature', 'Adaptive quadrature', 'numerical-analysis-core'], ['num-krylov-subspace', 'Krylov subspace methods', 'numerical-analysis-core'], ['num-conjugate-gradient', 'Conjugate gradient', 'numerical-analysis-core'],
  ['num-gmres', 'GMRES', 'numerical-analysis-core'], ['num-sparse-linear-algebra', 'Sparse linear algebra', 'numerical-analysis-core'], ['num-finite-difference', 'Finite difference', 'numerical-analysis-core'],
  ['num-finite-element-basics', 'Finite element basics', 'numerical-analysis-core'], ['num-spectral-methods', 'Spectral methods', 'numerical-analysis-core'], ['opt-bfgs', 'BFGS', 'optimization-core'],
  ['opt-subgradient', 'Subgradient', 'optimization-core'], ['opt-tangent-normal-cones', 'Tangent and normal cones', 'optimization-core'], ['opt-constraint-qualification', 'Constraint qualification', 'optimization-core'],
  ['opt-fenchel-duality', 'Fenchel duality', 'optimization-core'], ['opt-mirror-descent', 'Mirror descent', 'optimization-core'], ['opt-bregman-divergence', 'Bregman divergence', 'optimization-core'],
  ['opt-calculus-variations', 'Calculus of variations', 'optimization-core'], ['opt-optimal-control-basics', 'Optimal control basics', 'optimization-core'], ['inv-well-posedness', 'Well-posedness and ill-posedness', 'estimation-inverse-problems-core'],
  ['inv-linear-inverse-problems', 'Linear inverse problems', 'estimation-inverse-problems-core'], ['inv-nonlinear-inverse-problems', 'Nonlinear inverse problems', 'estimation-inverse-problems-core'], ['inv-tikhonov-regularization', 'Tikhonov regularization', 'estimation-inverse-problems-core'],
  ['inv-bayesian-inverse-problems', 'Bayesian inverse problems', 'estimation-inverse-problems-core'], ['inv-recursive-least-squares', 'Recursive least squares', 'estimation-inverse-problems-core'], ['inv-kalman-filter', 'Kalman filter', 'estimation-inverse-problems-core'],
  ['inv-extended-kalman-filter', 'Extended Kalman filter', 'estimation-inverse-problems-core'], ['inv-wiener-filter', 'Wiener filter', 'estimation-inverse-problems-core'], ['inv-system-identification', 'System identification', 'estimation-inverse-problems-core'],
  ['inv-observability', 'Observability', 'estimation-inverse-problems-core'], ['inv-sensitivity-matrices', 'Sensitivity matrices', 'estimation-inverse-problems-core'], ['inv-uncertainty-ellipsoids', 'Uncertainty ellipsoids', 'estimation-inverse-problems-core'],
  ['info-jensen-shannon-divergence', 'Jensen–Shannon divergence', 'statistics-estimation'], ['info-mutual-information', 'Mutual information', 'statistics-estimation'], ['info-data-processing-inequality', 'Data processing inequality', 'statistics-estimation'],
  ['info-maximum-entropy', 'Maximum entropy', 'statistics-estimation'], ['model-dimensional-analysis', 'Dimensional analysis', 'mathematical-modeling-core'], ['model-buckingham-pi', 'Buckingham Pi theorem', 'mathematical-modeling-core'],
  ['model-nondimensionalization', 'Nondimensionalization', 'mathematical-modeling-core'], ['model-sensitivity-analysis', 'Sensitivity analysis', 'mathematical-modeling-core'], ['model-uncertainty-propagation', 'Uncertainty propagation', 'mathematical-modeling-core'],
  ['model-reduction', 'Model reduction', 'scientific-computing-core'], ['model-validation-residual-analysis', 'Model validation and residual analysis', 'scientific-computing-core']
]

const domainByCourse = { foundation: 'mathematical-foundations', '01': 'calculus-analysis', '02': 'linear-algebra', '03': 'probability-statistics', '04': 'discrete-mathematics', '05': 'numerical-analysis', '06': 'optimization', '07': 'matrix-calculus', '08': 'machine-learning', '09': 'deep-learning', '10': 'foundation-models' }
const domainByPrefix = { prep: 'mathematical-foundations', calc: 'calculus-analysis', la: 'linear-algebra', prob: 'probability-statistics', stat: 'probability-statistics', dm: 'discrete-mathematics', num: 'numerical-analysis', opt: 'optimization', mat: 'linear-algebra', ml: 'machine-learning', dl: 'deep-learning', frontier: 'foundation-models' }
const moduleByPrefix = { prep: 'foundations-literacy', calc: 'calculus-core', la: 'linear-algebra-core', prob: 'probability-foundations', stat: 'statistics-estimation', dm: 'discrete-proof-algorithms', num: 'numerical-analysis-core', opt: 'optimization-core', mat: 'linear-algebra-core', ml: 'machine-learning-core', dl: 'deep-learning-core', frontier: 'foundation-models-core' }
const plannedModule = new Map(planned.map(([id, title, module]) => [id, module]))
const moduleDomain = (module) => module === 'matrix-calculus-differentiation' ? 'matrix-calculus' : module === 'complex-analysis-core' ? 'complex-analysis' : module === 'mathematical-modeling-core' ? 'mathematical-modeling' : module.startsWith('probability') ? (module === 'probability-processes' ? 'stochastic-processes' : 'probability-statistics') : module === 'signals-fourier-analysis' ? 'signals-systems-transforms' : module.startsWith('differential') ? 'differential-equations' : module.startsWith('numerical') ? 'numerical-analysis' : module.startsWith('optimization') ? 'optimization' : module.startsWith('estimation') ? 'estimation-inverse-problems' : module.startsWith('machine') ? 'machine-learning' : module.startsWith('deep') ? 'deep-learning' : module.startsWith('foundation-models') ? 'foundation-models' : module.startsWith('scientific') ? 'scientific-computing' : module === 'statistics-estimation' ? 'probability-statistics' : module === 'linear-algebra-core' ? 'linear-algebra' : 'mathematical-modeling'

function enrich(topic) {
  if (topic.status === 'planned' && plannedModule.has(topic.id)) {
    const module = plannedModule.get(topic.id)
    const { course, order, routes, ...metadata } = topic
    return { ...metadata, domain: moduleDomain(module), module, tags: [moduleDomain(module), module] }
  }
  const prefix = topic.id.split('-')[0]
  let domain = domainByPrefix[prefix] ?? domainByCourse[topic.course] ?? 'mathematical-foundations'
  if (topic.id.startsWith('mat-fourier') || topic.id.startsWith('mat-convolution') || topic.id.startsWith('mat-filtering')) domain = 'signals-systems-transforms'
  if (topic.id.startsWith('mat-wls') || topic.id.startsWith('mat-gls') || topic.id.startsWith('mat-ols') || topic.id.startsWith('mat-covariance')) domain = 'estimation-inverse-problems'
  let module = moduleByPrefix[prefix] ?? 'foundations-literacy'
  if (topic.id.startsWith('mat-fourier') || topic.id.startsWith('mat-convolution') || topic.id.startsWith('mat-filtering')) module = 'signals-fourier-analysis'
  if (topic.id.startsWith('mat-wls') || topic.id.startsWith('mat-gls') || topic.id.startsWith('mat-ols') || topic.id.startsWith('mat-covariance')) module = 'estimation-inverse-problems-core'
  return { ...topic, domain, module, level: topic.course === 'foundation' ? 'introductory' : 'undergraduate', tags: [domain, module] }
}

// Prerequisites are authored edges, not an artifact of list order. A planned
// Topic without an entry is intentionally a root until its mathematics is
// reviewed; it must never inherit an unrelated predecessor from its Module.
const plannedPrerequisitesById = {
  'mat-gram-matrix': ['la-inner-products-norms-angles', 'la-matrix-multiplication'],
  'stat-fisher-information-matrix': ['stat-likelihood-maximum-likelihood', 'prob-multivariate-normal-distribution', 'calc-gradient-directional-derivative', 'calc-hessian-second-order', 'prob-covariance-correlation'],
  'stat-estimator-covariance': ['stat-fisher-information-matrix', 'prob-covariance-correlation'],
  'stat-vif-collinearity': ['stat-estimator-covariance', 'mat-gram-matrix'],
  'stat-wls-fisher-information': ['mat-wls-inverse-variance', 'stat-fisher-information-matrix', 'stat-estimator-covariance'],
  'stat-model-misspecification': ['stat-likelihood-maximum-likelihood', 'stat-estimator-covariance'],
  'mat-scalar-by-vector-derivative': ['calc-derivatives-rates', 'calc-multivariable-functions-partial-derivatives', 'la-vectors-linear-combinations', 'prep-symbols-types-shapes'],
  'mat-vector-by-vector-derivative': ['mat-scalar-by-vector-derivative'],
  'mat-scalar-by-matrix-derivative': ['mat-scalar-by-vector-derivative', 'la-matrix-multiplication'],
  'mat-vector-by-matrix-derivative': ['mat-vector-by-vector-derivative', 'mat-scalar-by-matrix-derivative'],
  'mat-matrix-differential': ['mat-scalar-by-matrix-derivative', 'mat-vector-by-matrix-derivative'],
  'mat-trace-trick': ['mat-matrix-differential', 'mat-gram-matrix'],
  'mat-quadratic-form-derivatives': ['mat-scalar-by-vector-derivative', 'la-quadratic-forms-positive-definite'],
  'mat-inverse-matrix-derivative': ['mat-matrix-differential', 'la-invertibility-inverse-matrices'],
  'mat-log-determinant-derivative': ['mat-inverse-matrix-derivative', 'mat-matrix-differential'],
  'mat-matrix-chain-rule': ['mat-vector-by-vector-derivative', 'mat-vector-by-matrix-derivative'],
  'mat-jacobian-vector-product': ['mat-vector-by-vector-derivative', 'la-matrix-multiplication'],
  'mat-vector-jacobian-product': ['mat-jacobian-vector-product'],
  'mat-automatic-differentiation': ['mat-matrix-chain-rule', 'mat-jacobian-vector-product'],
  'mat-forward-mode-ad': ['mat-automatic-differentiation', 'mat-jacobian-vector-product'],
  'mat-reverse-mode-ad': ['mat-automatic-differentiation', 'mat-vector-jacobian-product'],
  'mat-vec-operator': ['mat-matrix-differential', 'prep-symbols-types-shapes'],
  'mat-kronecker-product': ['mat-vec-operator', 'la-matrix-multiplication'],
  'prob-bernoulli-distribution': ['prob-random-variables-cdf-pmf-pdf'],
  'prob-binomial-distribution': ['prob-bernoulli-distribution', 'prob-expectation-variance-moments'],
  'prob-poisson-distribution': ['prob-binomial-distribution', 'prob-expectation-variance-moments'],
  'prob-gaussian-distribution': ['prob-continuous-distributions', 'prob-expectation-variance-moments'],
  'prob-log-normal-distribution': ['prob-gaussian-distribution'],
  'prob-student-t-distribution': ['prob-gaussian-distribution', 'stat-t-chi-square-sampling-distributions', 'prob-expectation-variance-moments'],
  'prob-dirichlet-distribution': ['prob-multivariate-normal-distribution', 'prob-expectation-variance-moments'],
  'prob-gaussian-mixture': ['prob-gaussian-distribution'],
  'prob-generating-functions': ['prob-random-variables-cdf-pmf-pdf', 'prob-expectation-variance-moments'],
  'prob-moment-generating-functions': ['prob-generating-functions'],
  'prob-characteristic-functions': ['prob-moment-generating-functions', 'prep-complex-numbers-euler-form'],
  'prob-random-walk': ['prob-bernoulli-distribution', 'prob-expectation-variance-moments'],
  'prob-markov-chains': ['prob-conditional-probability-independence', 'prob-random-walk'],
  'prob-poisson-process': ['prob-poisson-distribution'],
  'prob-brownian-motion': ['prob-poisson-process', 'prob-gaussian-distribution'],
  'prob-gaussian-process': ['prob-brownian-motion', 'prob-multivariate-normal-distribution'],
  'prob-stationarity-autocorrelation': ['prob-gaussian-process', 'prob-covariance-correlation'],
  'stat-cramer-rao-lower-bound': ['stat-fisher-information-matrix', 'stat-estimator-covariance'],
  'stat-observed-information': ['stat-likelihood-maximum-likelihood', 'stat-fisher-information-matrix'],
  'stat-identifiability': ['stat-likelihood-maximum-likelihood', 'stat-model-misspecification'],
  'stat-delta-method': ['calc-multivariable-functions-partial-derivatives', 'stat-estimator-covariance'],
  'stat-error-propagation': ['stat-delta-method', 'prob-covariance-correlation'],
  'stat-sufficient-statistics': ['stat-likelihood-maximum-likelihood', 'prob-conditional-probability-independence'],
  'stat-exponential-family': ['stat-sufficient-statistics', 'stat-likelihood-maximum-likelihood'],
  'stat-generalized-linear-models': ['stat-exponential-family', 'mat-ols-design-matrices'],
  'stat-poisson-regression': ['stat-generalized-linear-models', 'prob-poisson-distribution'],
  'stat-covariance-estimation': ['prob-covariance-correlation', 'stat-estimator-covariance'],
  'stat-experimental-design': ['stat-estimator-covariance', 'stat-identifiability'],
  'stat-optimal-experimental-design': ['stat-experimental-design', 'stat-fisher-information-matrix'],
  'stat-sandwich-covariance': ['stat-generalized-linear-models', 'stat-covariance-estimation'],
  'sig-continuous-time-signals': ['calc-functions-limits-continuity'],
  'sig-discrete-time-signals': ['sig-continuous-time-signals', 'prob-random-variables-cdf-pmf-pdf'],
  'sig-impulse-step': ['sig-continuous-time-signals', 'sig-discrete-time-signals'],
  'sig-lti-systems': ['sig-impulse-step', 'la-matrix-multiplication'],
  'sig-impulse-response': ['sig-lti-systems'],
  'sig-convolution': ['sig-impulse-response', 'la-inner-products-norms-angles'],
  'sig-correlation': ['sig-convolution', 'prob-covariance-correlation'],
  'sig-autocorrelation': ['sig-correlation', 'prob-stationarity-autocorrelation'],
  'sig-fourier-series': ['calc-integrals-fundamental-theorem', 'la-inner-products-norms-angles', 'prep-complex-numbers-euler-form'],
  'sig-fourier-transform': ['sig-fourier-series', 'sig-continuous-time-signals'],
  'sig-convolution-theorem': ['sig-fourier-transform', 'sig-convolution'],
  'sig-parseval-theorem': ['sig-fourier-series', 'la-inner-products-norms-angles'],
  'sig-dft': ['sig-fourier-series', 'sig-discrete-time-signals'],
  'sig-fft': ['sig-dft'],
  'sig-sampling-theorem-aliasing': ['sig-fourier-transform', 'sig-dft'],
  'sig-stft-spectrogram': ['sig-fourier-transform', 'sig-sampling-theorem-aliasing'],
  'sig-laplace-transform': ['calc-integrals-fundamental-theorem', 'sig-continuous-time-signals'],
  'ode-first-order': ['calc-derivatives-rates', 'calc-integrals-fundamental-theorem'],
  'ode-second-order': ['ode-first-order', 'calc-derivatives-rates'],
  'ode-systems': ['ode-first-order', 'la-matrix-multiplication'],
  'ode-matrix-exponential': ['ode-systems', 'mat-matrix-differential'],
  'ode-phase-plane-stability': ['ode-systems', 'calc-multivariable-functions-partial-derivatives'],
  'ode-boundary-value-problems': ['ode-second-order', 'ode-systems'],
  'pde-classification': ['calc-multivariable-functions-partial-derivatives', 'ode-first-order'],
  'pde-heat-equation': ['pde-classification', 'sig-fourier-series'],
  'pde-wave-equation': ['pde-classification', 'sig-fourier-series'],
  'pde-laplace-equation': ['pde-classification', 'la-inner-products-norms-angles'],
  'pde-green-functions': ['pde-laplace-equation', 'sig-convolution'],
  'pde-eigenfunction-expansion': ['pde-heat-equation', 'pde-wave-equation', 'la-singular-value-decomposition'],
  'complex-analytic-functions': ['prep-complex-numbers-euler-form', 'calc-multivariable-functions-partial-derivatives'],
  'complex-cauchy-riemann': ['complex-analytic-functions'],
  'complex-contour-integration': ['complex-cauchy-riemann', 'calc-integrals-fundamental-theorem'],
  'complex-residue-theorem': ['complex-contour-integration'],
  'num-backward-error-analysis': ['num-errors-conditioning-stability', 'num-floating-point-rounding'],
  'num-chebyshev-approximation': ['num-polynomial-interpolation', 'calc-functions-limits-continuity'],
  'num-adaptive-quadrature': ['num-numerical-integration-quadrature', 'num-errors-conditioning-stability'],
  'num-krylov-subspace': ['la-matrix-multiplication', 'la-eigenvalues-eigenvectors'],
  'num-conjugate-gradient': ['num-krylov-subspace', 'la-quadratic-forms-positive-definite'],
  'num-gmres': ['num-krylov-subspace', 'num-conjugate-gradient'],
  'num-sparse-linear-algebra': ['la-matrix-multiplication', 'num-errors-conditioning-stability'],
  'num-finite-difference': ['calc-derivatives-rates', 'num-errors-conditioning-stability'],
  'num-finite-element-basics': ['num-finite-difference', 'la-inner-products-norms-angles'],
  'num-spectral-methods': ['num-finite-element-basics', 'sig-fourier-series'],
  'opt-bfgs': ['opt-gradient-descent-convergence', 'calc-hessian-second-order'],
  'opt-subgradient': ['opt-gradient-descent-convergence', 'opt-convex-sets-functions'],
  'opt-tangent-normal-cones': ['opt-problem-formulation-objectives-constraints', 'la-inner-products-norms-angles'],
  'opt-constraint-qualification': ['opt-tangent-normal-cones', 'calc-lagrange-multipliers'],
  'opt-fenchel-duality': ['opt-convex-sets-functions', 'calc-lagrange-multipliers'],
  'opt-mirror-descent': ['opt-fenchel-duality', 'opt-bregman-divergence'],
  'opt-bregman-divergence': ['opt-convex-sets-functions', 'stat-entropy-cross-entropy-kl-divergence'],
  'opt-calculus-variations': ['calc-multivariable-functions-partial-derivatives', 'ode-first-order'],
  'opt-optimal-control-basics': ['opt-calculus-variations', 'ode-systems'],
  'inv-well-posedness': ['num-errors-conditioning-stability', 'stat-identifiability'],
  'inv-linear-inverse-problems': ['inv-well-posedness', 'la-least-squares-computation-pseudoinverse'],
  'inv-nonlinear-inverse-problems': ['inv-linear-inverse-problems', 'calc-multivariable-functions-partial-derivatives'],
  'inv-tikhonov-regularization': ['inv-linear-inverse-problems', 'num-regularization-ill-posed-problems'],
  'inv-bayesian-inverse-problems': ['inv-linear-inverse-problems', 'prob-multivariate-normal-distribution'],
  'inv-recursive-least-squares': ['inv-linear-inverse-problems', 'mat-wls-inverse-variance'],
  'inv-kalman-filter': ['inv-recursive-least-squares', 'ode-systems', 'prob-multivariate-normal-distribution'],
  'inv-extended-kalman-filter': ['inv-kalman-filter', 'inv-nonlinear-inverse-problems'],
  'inv-wiener-filter': ['sig-fourier-transform', 'prob-covariance-correlation'],
  'inv-system-identification': ['inv-recursive-least-squares', 'sig-lti-systems'],
  'inv-observability': ['inv-system-identification', 'ode-systems'],
  'inv-sensitivity-matrices': ['inv-nonlinear-inverse-problems', 'mat-jacobian-vector-product'],
  'inv-uncertainty-ellipsoids': ['inv-sensitivity-matrices', 'prob-covariance-correlation'],
  'info-jensen-shannon-divergence': ['stat-entropy-cross-entropy-kl-divergence', 'prob-gaussian-mixture'],
  'info-mutual-information': ['prob-conditional-probability-independence', 'stat-entropy-cross-entropy-kl-divergence'],
  'info-data-processing-inequality': ['info-mutual-information'],
  'info-maximum-entropy': ['stat-entropy-cross-entropy-kl-divergence', 'prob-conditional-probability-independence'],
  'model-dimensional-analysis': ['prep-symbols-types-shapes'],
  'model-buckingham-pi': ['model-dimensional-analysis', 'model-nondimensionalization'],
  'model-nondimensionalization': ['model-dimensional-analysis', 'calc-derivatives-rates'],
  'model-sensitivity-analysis': ['model-nondimensionalization', 'inv-sensitivity-matrices'],
  'model-uncertainty-propagation': ['model-sensitivity-analysis', 'stat-error-propagation'],
  'model-reduction': ['la-singular-value-decomposition', 'num-sparse-linear-algebra'],
  'model-validation-residual-analysis': ['model-reduction', 'stat-covariance-estimation'],
}

function plannedPrerequisites(id) {
  return plannedPrerequisitesById[id] ?? []
}

const source = await readFile(topicFile, 'utf8')
const topics = parse(source).map(enrich).filter((topic) => topic.id !== 'hotspot-matrix')
const ids = new Set(topics.map((topic) => topic.id))
for (const [index, [id, title, module]] of planned.entries()) {
  if (ids.has(id)) continue
  const domain = moduleDomain(module)
  topics.push({ id, title, summary: `${title}を工学数学Knowledge Baseへ接続するための計画Topic`, status: 'planned', prerequisites: plannedPrerequisites(id), estimated_minutes: { slides: 20, textbook: 45, exercises: 30 }, domain, module, level: 'planned', tags: [domain, module] })
}
for (const [id] of planned) {
  const topic = topics.find((candidate) => candidate.id === id)
  if (topic && topic.status === 'planned') topic.prerequisites = plannedPrerequisites(id)
}
const write = process.argv.includes('--write') || !process.argv.includes('--check')
if (write) await writeFile(topicFile, stringify(topics, { lineWidth: 120 }))
console.log(`taxonomy migration: ${topics.length} topics enriched; planned added=${topics.length - ids.size}; mode=${write ? 'write' : 'check'}`)
