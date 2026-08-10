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

const moduleLast = new Map()
function plannedPrerequisites(id, module) {
  const previous = moduleLast.get(module)
  moduleLast.set(module, id)
  if (id === 'stat-fisher-information-matrix') return ['stat-likelihood-maximum-likelihood', 'prob-multivariate-normal-distribution']
  if (id === 'stat-estimator-covariance') return ['stat-fisher-information-matrix']
  if (id === 'stat-vif-collinearity') return ['stat-estimator-covariance']
  if (id === 'stat-wls-fisher-information') return ['mat-wls-inverse-variance', 'stat-fisher-information-matrix']
  if (id === 'stat-model-misspecification') return ['stat-likelihood-maximum-likelihood']
  return previous ? [previous] : []
}

const source = await readFile(topicFile, 'utf8')
const topics = parse(source).map(enrich).filter((topic) => topic.id !== 'hotspot-matrix')
const ids = new Set(topics.map((topic) => topic.id))
for (const [index, [id, title, module]] of planned.entries()) {
  if (ids.has(id)) continue
  const domain = moduleDomain(module)
  topics.push({ id, title, summary: `${title}を工学数学Knowledge Baseへ接続するための計画Topic`, status: 'planned', prerequisites: plannedPrerequisites(id, module), estimated_minutes: { slides: 20, textbook: 45, exercises: 30 }, domain, module, level: 'planned', tags: [domain, module] })
}
moduleLast.clear()
for (const [id] of planned) {
  const topic = topics.find((candidate) => candidate.id === id)
  if (topic) topic.prerequisites = plannedPrerequisites(id, topic.module)
}
const write = process.argv.includes('--write') || !process.argv.includes('--check')
if (write) await writeFile(topicFile, stringify(topics, { lineWidth: 120 }))
console.log(`taxonomy migration: ${topics.length} topics enriched; planned added=${topics.length - ids.size}; mode=${write ? 'write' : 'check'}`)
