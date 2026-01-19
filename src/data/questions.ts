import type { Question } from '../types';

export const questions: Question[] = [
  // ========================================
  // ML CONCEPTS - NEURAL NETWORKS & DEEP LEARNING
  // ========================================
  {
    id: 'ml-nn-001',
    type: 'multiple-choice',
    category: 'ml-concepts',
    subcategory: 'activation-functions',
    difficulty: 'beginner',
    question: 'What is the primary purpose of an activation function in a neural network?',
    options: [
      'To introduce non-linearity into the network',
      'To normalize the input data',
      'To reduce the number of parameters',
      'To prevent gradient descent from converging'
    ],
    correctAnswer: 'To introduce non-linearity into the network',
    briefExplanation: 'Activation functions introduce non-linearity, allowing neural networks to learn complex patterns. Without them, the network would be equivalent to a simple linear regression model.',
    relatedConcepts: ['neural-network-basics', 'deep-learning']
  },
  {
    id: 'ml-nn-002',
    type: 'fill-blank',
    category: 'ml-concepts',
    subcategory: 'backpropagation',
    difficulty: 'intermediate',
    question: 'Backpropagation calculates gradients using the ____ rule from calculus.',
    correctAnswer: 'chain',
    briefExplanation: 'The chain rule allows us to compute derivatives of composite functions. Backpropagation applies this to efficiently calculate gradients layer by layer.',
    relatedConcepts: ['gradient-descent', 'neural-network-training']
  },
  {
    id: 'ml-nn-003',
    type: 'explain-code',
    category: 'ml-concepts',
    subcategory: 'activation-functions',
    difficulty: 'beginner',
    question: 'Explain what this activation function does:',
    codeSnippet: 'def sigmoid(x):\n    return 1 / (1 + np.exp(-x))',
    correctAnswer: 'sigmoid activation function',
    briefExplanation: 'The sigmoid function squashes any input value to a range between 0 and 1. It\'s commonly used for binary classification output layers.',
    relatedConcepts: ['activation-functions', 'binary-classification']
  },
  {
    id: 'ml-nn-004',
    type: 'flashcard',
    category: 'ml-concepts',
    subcategory: 'gradient-problems',
    difficulty: 'intermediate',
    question: 'What causes the vanishing gradient problem?',
    correctAnswer: 'When gradients become very small during backpropagation through many layers, making it difficult to train early layers',
    briefExplanation: 'In deep networks, gradients can shrink exponentially as they propagate backwards, especially with sigmoid/tanh activations. This makes early layers learn very slowly.',
    relatedConcepts: ['backpropagation', 'deep-learning', 'activation-functions']
  },
  {
    id: 'ml-nn-005',
    type: 'spot-bug',
    category: 'ml-concepts',
    subcategory: 'neural-architecture',
    difficulty: 'beginner',
    question: 'Spot the bug in this binary classification model:',
    codeSnippet: 'model.add(Dense(64, activation=\'relu\'))\nmodel.add(Dense(32, activation=\'relu\'))\nmodel.add(Dense(1, activation=\'relu\'))',
    correctAnswer: 'The output layer should use sigmoid activation for binary classification, not relu',
    briefExplanation: 'Binary classification needs outputs between 0 and 1 (probabilities). ReLU outputs can be any positive number. Use sigmoid for binary classification.',
    relatedConcepts: ['activation-functions', 'binary-classification']
  },
  {
    id: 'ml-nn-006',
    type: 'predict-output',
    category: 'ml-concepts',
    subcategory: 'cnn-layers',
    difficulty: 'intermediate',
    question: 'What is the output shape after this Conv2D layer?',
    codeSnippet: 'Conv2D(32, (3,3), padding=\'same\')(input_28x28x1)',
    correctAnswer: '28x28x32',
    briefExplanation: 'With padding="same", the spatial dimensions (28x28) are preserved. The 32 filters create 32 output channels, resulting in 28x28x32.',
    relatedConcepts: ['convolutional-layers', 'cnn-architecture']
  },

  // ========================================
  // ML CONCEPTS - LOSS FUNCTIONS & OPTIMIZATION
  // ========================================
  {
    id: 'ml-opt-001',
    type: 'multiple-choice',
    category: 'ml-concepts',
    subcategory: 'loss-functions',
    difficulty: 'beginner',
    question: 'When should you use categorical crossentropy instead of binary crossentropy?',
    options: [
      'When you have more than 2 classes to predict',
      'When your data is imbalanced',
      'When you want faster training',
      'When working with regression problems'
    ],
    correctAnswer: 'When you have more than 2 classes to predict',
    briefExplanation: 'Categorical crossentropy is for multi-class classification (3+ classes). Binary crossentropy is specifically for binary (2-class) problems.',
    relatedConcepts: ['loss-functions', 'classification']
  },
  {
    id: 'ml-opt-002',
    type: 'flashcard',
    category: 'ml-concepts',
    subcategory: 'learning-rate',
    difficulty: 'beginner',
    question: 'What happens when the learning rate is too high?',
    correctAnswer: 'The model may overshoot the minimum and fail to converge, or diverge entirely',
    briefExplanation: 'A high learning rate causes large parameter updates that can jump past optimal values. The loss may oscillate or increase instead of decreasing.',
    relatedConcepts: ['gradient-descent', 'optimization']
  },
  {
    id: 'ml-opt-003',
    type: 'explain-code',
    category: 'ml-concepts',
    subcategory: 'optimizers',
    difficulty: 'intermediate',
    question: 'Explain each parameter in this optimizer:',
    codeSnippet: 'optimizer = Adam(lr=0.001, beta_1=0.9, beta_2=0.999)',
    correctAnswer: 'lr is learning rate, beta_1 is momentum coefficient, beta_2 is second moment coefficient',
    briefExplanation: 'lr controls step size. beta_1 controls the exponential decay rate for first moment estimates (momentum). beta_2 controls decay for second moment (variance).',
    relatedConcepts: ['optimization', 'adam-optimizer']
  },
  {
    id: 'ml-opt-004',
    type: 'multiple-choice',
    category: 'ml-concepts',
    subcategory: 'gradient-descent',
    difficulty: 'intermediate',
    question: 'What is the advantage of mini-batch gradient descent over full-batch?',
    options: [
      'Faster convergence and better generalization',
      'Always finds the global minimum',
      'Requires less memory',
      'Eliminates the need for regularization'
    ],
    correctAnswer: 'Faster convergence and better generalization',
    briefExplanation: 'Mini-batch provides a balance: faster updates than full-batch, more stable than single-sample SGD, and the noise helps escape local minima.',
    relatedConcepts: ['gradient-descent', 'optimization']
  },

  // ========================================
  // ML CONCEPTS - OVERFITTING & REGULARIZATION
  // ========================================
  {
    id: 'ml-reg-001',
    type: 'fill-blank',
    category: 'ml-concepts',
    subcategory: 'regularization',
    difficulty: 'intermediate',
    question: 'L2 regularization adds a penalty proportional to the ____ of weights.',
    correctAnswer: 'square',
    briefExplanation: 'L2 regularization (Ridge) adds the sum of squared weights to the loss function. This encourages smaller weights and prevents overfitting.',
    relatedConcepts: ['regularization', 'overfitting']
  },
  {
    id: 'ml-reg-002',
    type: 'multiple-choice',
    category: 'ml-concepts',
    subcategory: 'overfitting',
    difficulty: 'beginner',
    question: 'Your model has 99% train accuracy but only 60% test accuracy. What is the problem?',
    options: [
      'The model is overfitting to the training data',
      'The model is underfitting',
      'The learning rate is too low',
      'The data needs more features'
    ],
    correctAnswer: 'The model is overfitting to the training data',
    briefExplanation: 'Large gap between train and test accuracy indicates overfitting. The model memorized training data but doesn\'t generalize to new data.',
    relatedConcepts: ['overfitting', 'train-test-split', 'generalization']
  },
  {
    id: 'ml-reg-003',
    type: 'multiple-choice',
    category: 'ml-concepts',
    subcategory: 'regularization',
    difficulty: 'intermediate',
    question: 'Which of these techniques help prevent overfitting?',
    options: [
      'All of the above: dropout, batch normalization, and early stopping',
      'Only dropout',
      'Only early stopping',
      'None of these prevent overfitting'
    ],
    correctAnswer: 'All of the above: dropout, batch normalization, and early stopping',
    briefExplanation: 'Dropout randomly drops neurons during training. Batch normalization stabilizes learning. Early stopping halts training before overfitting. All help prevent overfitting.',
    relatedConcepts: ['dropout', 'batch-normalization', 'early-stopping', 'overfitting']
  },
  {
    id: 'ml-reg-004',
    type: 'flashcard',
    category: 'ml-concepts',
    subcategory: 'dropout',
    difficulty: 'intermediate',
    question: 'How does dropout prevent overfitting?',
    correctAnswer: 'By randomly deactivating neurons during training, forcing the network to learn redundant representations',
    briefExplanation: 'Dropout prevents neurons from co-adapting too much. The network can\'t rely on specific neurons, so it learns more robust features.',
    relatedConcepts: ['regularization', 'overfitting']
  },

  // ========================================
  // ML CONCEPTS - MODEL EVALUATION
  // ========================================
  {
    id: 'ml-eval-001',
    type: 'flashcard',
    category: 'ml-concepts',
    subcategory: 'metrics',
    difficulty: 'intermediate',
    question: 'When would you use F1-score instead of accuracy?',
    correctAnswer: 'When dealing with imbalanced datasets where accuracy can be misleading',
    briefExplanation: 'F1-score balances precision and recall. With imbalanced data, a model predicting only the majority class can have high accuracy but be useless.',
    relatedConcepts: ['evaluation-metrics', 'imbalanced-data', 'precision-recall']
  },
  {
    id: 'ml-eval-002',
    type: 'explain-code',
    category: 'ml-concepts',
    subcategory: 'confusion-matrix',
    difficulty: 'beginner',
    question: 'What does the diagonal of a confusion matrix represent?',
    codeSnippet: 'confusion_matrix(y_true, y_pred)\n# [[50,  5]\n#  [ 3, 42]]',
    correctAnswer: 'Correct predictions (true positives and true negatives)',
    briefExplanation: 'The diagonal shows correct predictions. Top-left is true negatives (50), bottom-right is true positives (42). Off-diagonal shows errors.',
    relatedConcepts: ['confusion-matrix', 'classification-metrics']
  },
  {
    id: 'ml-eval-003',
    type: 'multiple-choice',
    category: 'ml-concepts',
    subcategory: 'roc-auc',
    difficulty: 'intermediate',
    question: 'What does AUC-ROC measure?',
    options: [
      'The model\'s ability to distinguish between classes across all thresholds',
      'The accuracy of the model',
      'The training speed of the model',
      'The number of features used'
    ],
    correctAnswer: 'The model\'s ability to distinguish between classes across all thresholds',
    briefExplanation: 'AUC-ROC measures how well the model separates positive and negative classes. AUC of 1.0 is perfect, 0.5 is random guessing.',
    relatedConcepts: ['evaluation-metrics', 'classification', 'roc-curve']
  },
  {
    id: 'ml-eval-004',
    type: 'fill-blank',
    category: 'ml-concepts',
    subcategory: 'cross-validation',
    difficulty: 'beginner',
    question: 'K-fold cross-validation splits the data into K ____ subsets.',
    correctAnswer: 'equal',
    briefExplanation: 'K-fold splits data into K equal parts (folds). Each fold serves as a test set once while others are used for training.',
    relatedConcepts: ['cross-validation', 'model-evaluation']
  },

  // ========================================
  // PYTHON - NUMPY
  // ========================================
  {
    id: 'py-np-001',
    type: 'predict-output',
    category: 'python',
    subcategory: 'numpy-reshape',
    difficulty: 'beginner',
    question: 'What is the output of this NumPy operation?',
    codeSnippet: 'np.array([[1,2],[3,4]]).reshape(-1)',
    correctAnswer: '[1, 2, 3, 4]',
    briefExplanation: 'reshape(-1) flattens the array to 1D. The -1 tells NumPy to infer the dimension automatically.',
    relatedConcepts: ['numpy-basics', 'array-manipulation']
  },
  {
    id: 'py-np-002',
    type: 'fill-blank',
    category: 'python',
    subcategory: 'numpy-operations',
    difficulty: 'beginner',
    question: 'Use np.____([1,2,3], [4,5,6]) for element-wise multiplication.',
    correctAnswer: 'multiply',
    briefExplanation: 'np.multiply() performs element-wise multiplication. You can also use the * operator: [1,2,3] * [4,5,6] = [4,10,18].',
    relatedConcepts: ['numpy-operations', 'array-arithmetic']
  },
  {
    id: 'py-np-003',
    type: 'explain-code',
    category: 'python',
    subcategory: 'numpy-operations',
    difficulty: 'intermediate',
    question: 'Explain the difference between these two operations:',
    codeSnippet: 'A @ B  # vs\nA * B',
    correctAnswer: '@ is matrix multiplication, * is element-wise multiplication',
    briefExplanation: 'The @ operator performs matrix multiplication (dot product). The * operator multiplies corresponding elements. Very different operations!',
    relatedConcepts: ['numpy-operations', 'linear-algebra']
  },
  {
    id: 'py-np-004',
    type: 'spot-bug',
    category: 'python',
    subcategory: 'numpy-random',
    difficulty: 'beginner',
    question: 'Spot the issue with expecting different random values:',
    codeSnippet: 'np.random.seed(42)\nx = np.random.randn(100)\nnp.random.seed(42)\ny = np.random.randn(100)\n# Expecting x != y',
    correctAnswer: 'Setting the same seed (42) twice produces the same random values. x and y will be identical.',
    briefExplanation: 'The seed determines the random number sequence. Same seed = same sequence. Don\'t reset the seed if you want different values.',
    relatedConcepts: ['numpy-random', 'random-seed']
  },
  {
    id: 'py-np-005',
    type: 'predict-output',
    category: 'python',
    subcategory: 'numpy-indexing',
    difficulty: 'intermediate',
    question: 'What is the output?',
    codeSnippet: 'arr = np.array([10, 20, 30, 40, 50])\nprint(arr[1:4])',
    correctAnswer: '[20, 30, 40]',
    briefExplanation: 'Array slicing [1:4] returns elements at indices 1, 2, 3 (not including 4). Python uses zero-based indexing.',
    relatedConcepts: ['numpy-indexing', 'array-slicing']
  },
  {
    id: 'py-np-006',
    type: 'multiple-choice',
    category: 'python',
    subcategory: 'numpy-broadcasting',
    difficulty: 'intermediate',
    question: 'What does NumPy broadcasting allow you to do?',
    options: [
      'Perform operations on arrays of different shapes',
      'Send arrays over a network',
      'Parallelize operations across CPU cores',
      'Convert arrays to lists'
    ],
    correctAnswer: 'Perform operations on arrays of different shapes',
    briefExplanation: 'Broadcasting automatically expands smaller arrays to match larger ones during arithmetic operations, avoiding explicit copying.',
    relatedConcepts: ['numpy-broadcasting', 'array-operations']
  },

  // ========================================
  // PYTHON - PANDAS
  // ========================================
  {
    id: 'py-pd-001',
    type: 'explain-code',
    category: 'python',
    subcategory: 'pandas-groupby',
    difficulty: 'intermediate',
    question: 'Explain what this returns:',
    codeSnippet: 'df.groupby(\'category\')[\'sales\'].agg([\'mean\', \'sum\', \'count\'])',
    correctAnswer: 'A DataFrame with mean, sum, and count of sales for each category',
    briefExplanation: 'groupby groups rows by category. agg applies multiple aggregations (mean, sum, count) to the sales column for each group.',
    relatedConcepts: ['pandas-groupby', 'aggregation']
  },
  {
    id: 'py-pd-002',
    type: 'flashcard',
    category: 'python',
    subcategory: 'pandas-joins',
    difficulty: 'intermediate',
    question: 'What is the difference between merge() and join() in pandas?',
    correctAnswer: 'merge() joins on columns (more flexible), join() joins on index (more convenient)',
    briefExplanation: 'Both combine DataFrames. merge() is more general and joins on any column. join() is a shortcut for index-based merging.',
    relatedConcepts: ['pandas-joins', 'dataframe-operations']
  },
  {
    id: 'py-pd-003',
    type: 'fill-blank',
    category: 'python',
    subcategory: 'pandas-duplicates',
    difficulty: 'beginner',
    question: 'Use df.____([\'col1\', \'col2\']) to remove duplicates based on these columns.',
    correctAnswer: 'drop_duplicates',
    briefExplanation: 'drop_duplicates() removes duplicate rows. Specifying columns considers only those columns when identifying duplicates.',
    relatedConcepts: ['pandas-duplicates', 'data-cleaning']
  },
  {
    id: 'py-pd-004',
    type: 'predict-output',
    category: 'python',
    subcategory: 'pandas-indexing',
    difficulty: 'beginner',
    question: 'What does this return?',
    codeSnippet: 'df.loc[df[\'age\'] > 30, \'name\']',
    correctAnswer: 'A Series of names where age is greater than 30',
    briefExplanation: 'loc filters rows where age > 30, then selects only the \'name\' column. Returns a Series (not a DataFrame).',
    relatedConcepts: ['pandas-indexing', 'boolean-indexing']
  },
  {
    id: 'py-pd-005',
    type: 'multiple-choice',
    category: 'python',
    subcategory: 'pandas-missing-data',
    difficulty: 'beginner',
    question: 'Which method removes rows with any missing values?',
    options: [
      'df.dropna()',
      'df.fillna()',
      'df.remove_null()',
      'df.clean()'
    ],
    correctAnswer: 'df.dropna()',
    briefExplanation: 'dropna() removes rows (or columns) containing NaN values. fillna() replaces them instead of removing.',
    relatedConcepts: ['pandas-missing-data', 'data-cleaning']
  },
  {
    id: 'py-pd-006',
    type: 'explain-code',
    category: 'python',
    subcategory: 'pandas-apply',
    difficulty: 'intermediate',
    question: 'What does this code do?',
    codeSnippet: 'df[\'new_col\'] = df[\'old_col\'].apply(lambda x: x * 2)',
    correctAnswer: 'Creates a new column with values from old_col multiplied by 2',
    briefExplanation: 'apply() applies a function to each element in the Series. The lambda function doubles each value.',
    relatedConcepts: ['pandas-apply', 'lambda-functions']
  },

  // ========================================
  // PYTHON - DATA PREPROCESSING
  // ========================================
  {
    id: 'py-prep-001',
    type: 'multiple-choice',
    category: 'python',
    subcategory: 'scaling',
    difficulty: 'intermediate',
    question: 'When should you use StandardScaler vs MinMaxScaler?',
    options: [
      'StandardScaler for normally distributed data, MinMaxScaler for bounded ranges',
      'They are completely interchangeable',
      'StandardScaler is always better',
      'MinMaxScaler is only for images'
    ],
    correctAnswer: 'StandardScaler for normally distributed data, MinMaxScaler for bounded ranges',
    briefExplanation: 'StandardScaler (z-score) works well with normal distributions. MinMaxScaler scales to [0,1], useful when you need bounded values.',
    relatedConcepts: ['feature-scaling', 'data-preprocessing']
  },
  {
    id: 'py-prep-002',
    type: 'explain-code',
    category: 'python',
    subcategory: 'train-test-split',
    difficulty: 'beginner',
    question: 'Why set random_state in this code?',
    codeSnippet: 'train_test_split(X, y, test_size=0.2, random_state=42)',
    correctAnswer: 'To ensure reproducible splits - same random_state gives same split every time',
    briefExplanation: 'random_state fixes the random seed. This makes your experiments reproducible - you get the same train/test split each run.',
    relatedConcepts: ['train-test-split', 'reproducibility']
  },
  {
    id: 'py-prep-003',
    type: 'fill-blank',
    category: 'python',
    subcategory: 'encoding',
    difficulty: 'beginner',
    question: 'One-hot encoding converts ____ variables to ____ format.',
    correctAnswer: 'categorical, binary',
    briefExplanation: 'One-hot encoding transforms categorical variables (like colors: red, blue, green) into binary columns (is_red, is_blue, is_green).',
    relatedConcepts: ['encoding', 'categorical-data']
  },
  {
    id: 'py-prep-004',
    type: 'flashcard',
    category: 'python',
    subcategory: 'feature-engineering',
    difficulty: 'intermediate',
    question: 'What is feature engineering?',
    correctAnswer: 'Creating new features from existing data to improve model performance',
    briefExplanation: 'Feature engineering transforms raw data into better representations. Examples: extracting month from date, creating interaction terms, binning continuous variables.',
    relatedConcepts: ['feature-engineering', 'data-preprocessing']
  },

  // ========================================
  // PYTHON - BASICS FOR ML
  // ========================================
  {
    id: 'py-basic-001',
    type: 'predict-output',
    category: 'python',
    subcategory: 'list-comprehension',
    difficulty: 'beginner',
    question: 'What is the output?',
    codeSnippet: '[x**2 for x in range(5) if x % 2 == 0]',
    correctAnswer: '[0, 4, 16]',
    briefExplanation: 'List comprehension filters even numbers (0, 2, 4) from range(5), then squares them: 0²=0, 2²=4, 4²=16.',
    relatedConcepts: ['list-comprehension', 'python-basics']
  },
  {
    id: 'py-basic-002',
    type: 'explain-code',
    category: 'python',
    subcategory: 'lambda-functions',
    difficulty: 'beginner',
    question: 'Explain what lambda functions are used for:',
    codeSnippet: 'lambda x: x * 2',
    correctAnswer: 'Creating small anonymous functions for simple operations',
    briefExplanation: 'Lambda creates unnamed functions in one line. Useful for short operations passed to map(), filter(), or apply(). This one doubles its input.',
    relatedConcepts: ['lambda-functions', 'functional-programming']
  },
  {
    id: 'py-basic-003',
    type: 'spot-bug',
    category: 'python',
    subcategory: 'file-handling',
    difficulty: 'beginner',
    question: 'Find the issue when the file doesn\'t exist:',
    codeSnippet: 'with open(\'data.csv\', \'r\') as f:\n    data = f.read()\n    print(data)',
    correctAnswer: 'No error handling - will crash with FileNotFoundError if file doesn\'t exist',
    briefExplanation: 'This code assumes the file exists. Should wrap in try/except to handle FileNotFoundError gracefully.',
    relatedConcepts: ['error-handling', 'file-io']
  },
  {
    id: 'py-basic-004',
    type: 'multiple-choice',
    category: 'python',
    subcategory: 'data-structures',
    difficulty: 'beginner',
    question: 'Which Python data structure is best for unique, unordered items?',
    options: [
      'Set',
      'List',
      'Tuple',
      'Dictionary'
    ],
    correctAnswer: 'Set',
    briefExplanation: 'Sets store unique values and offer fast membership testing. Lists allow duplicates, tuples are immutable, dicts store key-value pairs.',
    relatedConcepts: ['python-data-structures', 'sets']
  },

  // ========================================
  // SQL - BASIC QUERIES
  // ========================================
  {
    id: 'sql-basic-001',
    type: 'fill-blank',
    category: 'sql',
    subcategory: 'select-queries',
    difficulty: 'beginner',
    question: 'SELECT * FROM users ____ age > 25',
    correctAnswer: 'WHERE',
    briefExplanation: 'WHERE clause filters rows based on conditions. It comes after FROM and before GROUP BY/ORDER BY.',
    relatedConcepts: ['sql-basics', 'filtering']
  },
  {
    id: 'sql-basic-002',
    type: 'flashcard',
    category: 'sql',
    subcategory: 'clauses',
    difficulty: 'intermediate',
    question: 'What is the difference between WHERE and HAVING?',
    correctAnswer: 'WHERE filters rows before grouping, HAVING filters groups after aggregation',
    briefExplanation: 'WHERE filters individual rows. HAVING filters aggregated results. Use HAVING with GROUP BY for conditions on aggregated values.',
    relatedConcepts: ['sql-filtering', 'group-by']
  },
  {
    id: 'sql-basic-003',
    type: 'explain-code',
    category: 'sql',
    subcategory: 'aggregation',
    difficulty: 'beginner',
    question: 'Explain the output of this query:',
    codeSnippet: 'SELECT COUNT(*), category\nFROM products\nGROUP BY category',
    correctAnswer: 'Returns the count of products in each category',
    briefExplanation: 'GROUP BY groups rows by category. COUNT(*) counts rows in each group. Result: each category with its product count.',
    relatedConcepts: ['sql-aggregation', 'group-by']
  },
  {
    id: 'sql-basic-004',
    type: 'multiple-choice',
    category: 'sql',
    subcategory: 'sorting',
    difficulty: 'beginner',
    question: 'How do you sort results in descending order?',
    options: [
      'ORDER BY column DESC',
      'SORT BY column DOWN',
      'ORDER column DESCENDING',
      'ARRANGE BY column -1'
    ],
    correctAnswer: 'ORDER BY column DESC',
    briefExplanation: 'ORDER BY sorts results. ASC is ascending (default), DESC is descending. Example: ORDER BY price DESC for highest price first.',
    relatedConcepts: ['sql-sorting', 'order-by']
  },

  // ========================================
  // SQL - JOINS
  // ========================================
  {
    id: 'sql-join-001',
    type: 'multiple-choice',
    category: 'sql',
    subcategory: 'sql-joins',
    difficulty: 'beginner',
    question: 'What does LEFT JOIN return?',
    options: [
      'All rows from left table, matching rows from right table (or NULL)',
      'Only rows that exist in both tables',
      'All rows from right table only',
      'All possible combinations of rows'
    ],
    correctAnswer: 'All rows from left table, matching rows from right table (or NULL)',
    briefExplanation: 'LEFT JOIN keeps all rows from the left table. Matching right table rows are included; non-matching get NULL values.',
    relatedConcepts: ['sql-joins', 'outer-joins']
  },
  {
    id: 'sql-join-002',
    type: 'fill-blank',
    category: 'sql',
    subcategory: 'sql-joins',
    difficulty: 'beginner',
    question: 'SELECT * FROM orders ____ JOIN customers ON orders.customer_id = customers.id',
    correctAnswer: 'INNER',
    briefExplanation: 'INNER JOIN returns only rows where the join condition matches in both tables. Could also use LEFT, RIGHT, or FULL.',
    relatedConcepts: ['sql-joins', 'inner-join']
  },
  {
    id: 'sql-join-003',
    type: 'spot-bug',
    category: 'sql',
    subcategory: 'sql-joins',
    difficulty: 'beginner',
    question: 'Spot the bug in this join:',
    codeSnippet: 'SELECT * FROM users JOIN orders',
    correctAnswer: 'Missing ON clause - creates a Cartesian product (every user with every order)',
    briefExplanation: 'Without ON, you get a cross join (Cartesian product). Every user row pairs with every order row. Usually not what you want!',
    relatedConcepts: ['sql-joins', 'join-conditions']
  },
  {
    id: 'sql-join-004',
    type: 'flashcard',
    category: 'sql',
    subcategory: 'sql-joins',
    difficulty: 'intermediate',
    question: 'When would you use a CROSS JOIN?',
    correctAnswer: 'When you need all possible combinations of rows from two tables',
    briefExplanation: 'CROSS JOIN creates a Cartesian product. Rare but useful for generating combinations, like all products × all sizes.',
    relatedConcepts: ['sql-joins', 'cross-join']
  },

  // ========================================
  // SQL - AGGREGATIONS
  // ========================================
  {
    id: 'sql-agg-001',
    type: 'predict-output',
    category: 'sql',
    subcategory: 'aggregation',
    difficulty: 'beginner',
    question: 'What type of result does this query return?',
    codeSnippet: 'SELECT AVG(salary) FROM employees WHERE department = \'IT\'',
    correctAnswer: 'A single number (the average salary)',
    briefExplanation: 'AVG() is an aggregate function that returns a single value. Without GROUP BY, it aggregates all matching rows into one result.',
    relatedConcepts: ['sql-aggregation', 'aggregate-functions']
  },
  {
    id: 'sql-agg-002',
    type: 'flashcard',
    category: 'sql',
    subcategory: 'group-by',
    difficulty: 'beginner',
    question: 'When do you use GROUP BY in SQL?',
    correctAnswer: 'When you want to aggregate data by categories or groups',
    briefExplanation: 'GROUP BY combines rows with the same values in specified columns. Use with aggregate functions like COUNT, SUM, AVG.',
    relatedConcepts: ['group-by', 'sql-aggregation']
  },
  {
    id: 'sql-agg-003',
    type: 'explain-code',
    category: 'sql',
    subcategory: 'having-clause',
    difficulty: 'intermediate',
    question: 'Explain what HAVING does in this query:',
    codeSnippet: 'SELECT department, MAX(salary)\nFROM employees\nGROUP BY department\nHAVING MAX(salary) > 100000',
    correctAnswer: 'Filters groups to only show departments where the max salary exceeds 100000',
    briefExplanation: 'HAVING filters aggregated results. WHERE filters before grouping; HAVING filters after. Only departments with max salary > 100k are shown.',
    relatedConcepts: ['having-clause', 'sql-aggregation', 'group-by']
  },
  {
    id: 'sql-agg-004',
    type: 'multiple-choice',
    category: 'sql',
    subcategory: 'aggregate-functions',
    difficulty: 'beginner',
    question: 'Which aggregate function counts non-NULL values?',
    options: [
      'COUNT(column)',
      'COUNT(*)',
      'SUM(column)',
      'TOTAL(column)'
    ],
    correctAnswer: 'COUNT(column)',
    briefExplanation: 'COUNT(column) counts non-NULL values in that column. COUNT(*) counts all rows including NULLs.',
    relatedConcepts: ['aggregate-functions', 'null-handling']
  },

  // ========================================
  // MORE ML CONCEPTS
  // ========================================
  {
    id: 'ml-advanced-001',
    type: 'flashcard',
    category: 'ml-concepts',
    subcategory: 'batch-normalization',
    difficulty: 'advanced',
    question: 'What are the two main benefits of batch normalization?',
    correctAnswer: 'Faster training (allows higher learning rates) and acts as regularization',
    briefExplanation: 'Batch norm normalizes layer inputs, reducing internal covariate shift. This stabilizes training and reduces overfitting.',
    relatedConcepts: ['batch-normalization', 'deep-learning']
  },
  {
    id: 'ml-advanced-002',
    type: 'multiple-choice',
    category: 'ml-concepts',
    subcategory: 'cnn-architecture',
    difficulty: 'intermediate',
    question: 'What is the purpose of pooling layers in CNNs?',
    options: [
      'Reduce spatial dimensions and computational cost',
      'Increase the number of parameters',
      'Add non-linearity',
      'Normalize activations'
    ],
    correctAnswer: 'Reduce spatial dimensions and computational cost',
    briefExplanation: 'Pooling (max/average) downsamples feature maps, reducing size and computation. Also provides translation invariance.',
    relatedConcepts: ['cnn-architecture', 'pooling-layers']
  },
  {
    id: 'ml-advanced-003',
    type: 'fill-blank',
    category: 'ml-concepts',
    subcategory: 'rnn-lstm',
    difficulty: 'advanced',
    question: 'LSTM networks use ____ gates to control information flow.',
    correctAnswer: 'forget, input, output',
    briefExplanation: 'LSTMs have three gates: forget (what to discard), input (what to add), and output (what to expose). This solves vanishing gradients.',
    relatedConcepts: ['lstm', 'rnn', 'sequence-modeling']
  },
  {
    id: 'ml-advanced-004',
    type: 'flashcard',
    category: 'ml-concepts',
    subcategory: 'transfer-learning',
    difficulty: 'intermediate',
    question: 'What is transfer learning?',
    correctAnswer: 'Using a pre-trained model on a new task, leveraging learned features',
    briefExplanation: 'Transfer learning reuses weights from models trained on large datasets. Fine-tune for your task instead of training from scratch.',
    relatedConcepts: ['transfer-learning', 'pre-trained-models']
  },
  {
    id: 'ml-advanced-005',
    type: 'multiple-choice',
    category: 'ml-concepts',
    subcategory: 'ensemble-methods',
    difficulty: 'intermediate',
    question: 'What is the main idea behind ensemble methods like Random Forest?',
    options: [
      'Combining multiple models to improve predictions',
      'Using only the best model',
      'Training one very deep model',
      'Reducing the number of features'
    ],
    correctAnswer: 'Combining multiple models to improve predictions',
    briefExplanation: 'Ensembles combine predictions from multiple models. Random Forest uses many decision trees; predictions are averaged or voted.',
    relatedConcepts: ['ensemble-methods', 'random-forest']
  },

  // ========================================
  // MORE PYTHON QUESTIONS
  // ========================================
  {
    id: 'py-advanced-001',
    type: 'explain-code',
    category: 'python',
    subcategory: 'generators',
    difficulty: 'advanced',
    question: 'What does yield do in this function?',
    codeSnippet: 'def count_up():\n    n = 0\n    while True:\n        yield n\n        n += 1',
    correctAnswer: 'Creates a generator that produces values lazily, one at a time',
    briefExplanation: 'yield makes this a generator. It produces values on demand without storing all in memory. Useful for large datasets.',
    relatedConcepts: ['generators', 'iterators', 'memory-efficiency']
  },
  {
    id: 'py-advanced-002',
    type: 'multiple-choice',
    category: 'python',
    subcategory: 'decorators',
    difficulty: 'advanced',
    question: 'What do Python decorators do?',
    options: [
      'Modify or enhance functions without changing their code',
      'Add comments to functions',
      'Delete functions',
      'Compile functions to C'
    ],
    correctAnswer: 'Modify or enhance functions without changing their code',
    briefExplanation: 'Decorators wrap functions to add functionality. Common uses: timing, logging, authentication. Syntax: @decorator above function.',
    relatedConcepts: ['decorators', 'higher-order-functions']
  },
  {
    id: 'py-advanced-003',
    type: 'predict-output',
    category: 'python',
    subcategory: 'dictionary-comprehension',
    difficulty: 'intermediate',
    question: 'What is the output?',
    codeSnippet: '{k: v**2 for k, v in {\'a\': 1, \'b\': 2}.items()}',
    correctAnswer: '{\'a\': 1, \'b\': 4}',
    briefExplanation: 'Dictionary comprehension creates a new dict. Squares each value: 1²=1, 2²=4. Keys remain unchanged.',
    relatedConcepts: ['dictionary-comprehension', 'python-basics']
  },
  {
    id: 'py-advanced-004',
    type: 'flashcard',
    category: 'python',
    subcategory: 'context-managers',
    difficulty: 'intermediate',
    question: 'What is the advantage of using "with" statements?',
    correctAnswer: 'Automatically handles resource cleanup (like closing files) even if errors occur',
    briefExplanation: 'Context managers (with statement) ensure cleanup code runs. Files are closed, locks released, etc., even with exceptions.',
    relatedConcepts: ['context-managers', 'with-statement']
  },

  // ========================================
  // MORE SQL QUESTIONS
  // ========================================
  {
    id: 'sql-advanced-001',
    type: 'explain-code',
    category: 'sql',
    subcategory: 'subqueries',
    difficulty: 'intermediate',
    question: 'What does this subquery do?',
    codeSnippet: 'SELECT name FROM employees\nWHERE salary > (SELECT AVG(salary) FROM employees)',
    correctAnswer: 'Finds employees earning more than the average salary',
    briefExplanation: 'The subquery calculates average salary. Main query filters employees whose salary exceeds that average.',
    relatedConcepts: ['subqueries', 'nested-queries']
  },
  {
    id: 'sql-advanced-002',
    type: 'multiple-choice',
    category: 'sql',
    subcategory: 'window-functions',
    difficulty: 'advanced',
    question: 'What do window functions allow you to do?',
    options: [
      'Perform calculations across rows related to the current row',
      'Open new database connections',
      'Create graphical interfaces',
      'Delete multiple rows at once'
    ],
    correctAnswer: 'Perform calculations across rows related to the current row',
    briefExplanation: 'Window functions (ROW_NUMBER, RANK, LAG, LEAD) calculate values across a "window" of rows without collapsing them.',
    relatedConcepts: ['window-functions', 'advanced-sql']
  },
  {
    id: 'sql-advanced-003',
    type: 'fill-blank',
    category: 'sql',
    subcategory: 'indexes',
    difficulty: 'intermediate',
    question: 'Creating an ____ on a column speeds up query performance.',
    correctAnswer: 'index',
    briefExplanation: 'Indexes create data structures (like B-trees) for fast lookups. They speed up SELECT queries but slow down INSERT/UPDATE.',
    relatedConcepts: ['database-indexes', 'query-optimization']
  },
  {
    id: 'sql-advanced-004',
    type: 'flashcard',
    category: 'sql',
    subcategory: 'transactions',
    difficulty: 'intermediate',
    question: 'What is the purpose of database transactions?',
    correctAnswer: 'Ensure a series of operations complete fully or not at all (atomicity)',
    briefExplanation: 'Transactions group operations. Either all succeed (COMMIT) or all fail (ROLLBACK). Ensures data consistency.',
    relatedConcepts: ['transactions', 'acid-properties']
  },

  // ========================================
  // ADDITIONAL ML CONCEPTS
  // ========================================
  {
    id: 'ml-concepts-020',
    type: 'multiple-choice',
    category: 'ml-concepts',
    subcategory: 'bias-variance',
    difficulty: 'intermediate',
    question: 'What does high bias in a model indicate?',
    options: [
      'The model is too simple and underfits the data',
      'The model is too complex and overfits',
      'The model has perfect accuracy',
      'The data is biased'
    ],
    correctAnswer: 'The model is too simple and underfits the data',
    briefExplanation: 'High bias = underfitting. The model makes strong assumptions and misses patterns. High variance = overfitting.',
    relatedConcepts: ['bias-variance-tradeoff', 'model-complexity']
  },
  {
    id: 'ml-concepts-021',
    type: 'flashcard',
    category: 'ml-concepts',
    subcategory: 'feature-importance',
    difficulty: 'intermediate',
    question: 'How does feature importance help in model interpretation?',
    correctAnswer: 'Shows which features contribute most to predictions, helping understand model decisions',
    briefExplanation: 'Feature importance ranks features by their impact. Helps identify key predictors and can guide feature selection.',
    relatedConcepts: ['feature-importance', 'model-interpretability']
  },
  {
    id: 'ml-concepts-022',
    type: 'fill-blank',
    category: 'ml-concepts',
    subcategory: 'precision-recall',
    difficulty: 'intermediate',
    question: 'Precision is TP/(TP+____), while Recall is TP/(TP+____).',
    correctAnswer: 'FP, FN',
    briefExplanation: 'Precision = TP/(TP+FP) measures accuracy of positive predictions. Recall = TP/(TP+FN) measures coverage of actual positives.',
    relatedConcepts: ['precision-recall', 'classification-metrics']
  },

  // Add more questions to reach 100+
  {
    id: 'py-ml-001',
    type: 'explain-code',
    category: 'python',
    subcategory: 'sklearn-pipeline',
    difficulty: 'intermediate',
    question: 'What advantage does Pipeline provide?',
    codeSnippet: 'pipe = Pipeline([\n    (\'scaler\', StandardScaler()),\n    (\'model\', LogisticRegression())\n])',
    correctAnswer: 'Chains preprocessing and modeling steps, preventing data leakage and simplifying workflow',
    briefExplanation: 'Pipelines ensure preprocessing is fitted only on training data, then applied to test. Prevents leakage and makes code cleaner.',
    relatedConcepts: ['sklearn-pipeline', 'data-leakage']
  },
  {
    id: 'ml-concepts-023',
    type: 'multiple-choice',
    category: 'ml-concepts',
    subcategory: 'decision-trees',
    difficulty: 'beginner',
    question: 'What metric do decision trees typically use to split nodes?',
    options: [
      'Gini impurity or information gain',
      'Mean squared error only',
      'Accuracy',
      'R-squared'
    ],
    correctAnswer: 'Gini impurity or information gain',
    briefExplanation: 'Decision trees split nodes to maximize information gain (or minimize Gini impurity). These measure the "purity" of splits.',
    relatedConcepts: ['decision-trees', 'gini-impurity', 'entropy']
  },
  {
    id: 'py-np-007',
    type: 'spot-bug',
    category: 'python',
    subcategory: 'numpy-copy',
    difficulty: 'intermediate',
    question: 'Spot the issue with modifying the array:',
    codeSnippet: 'a = np.array([1, 2, 3])\nb = a\nb[0] = 99\nprint(a)  # Expecting [1, 2, 3]',
    correctAnswer: 'b is a reference to a, not a copy. Modifying b changes a. Use b = a.copy()',
    briefExplanation: 'Array assignment creates a reference, not a copy. Changes to b affect a. Use .copy() for independent arrays.',
    relatedConcepts: ['numpy-copy', 'references-vs-copies']
  },
  {
    id: 'sql-basic-005',
    type: 'multiple-choice',
    category: 'sql',
    subcategory: 'null-handling',
    difficulty: 'beginner',
    question: 'How do you check for NULL values in SQL?',
    options: [
      'IS NULL or IS NOT NULL',
      '= NULL or != NULL',
      'EQUALS NULL',
      'NULL()'
    ],
    correctAnswer: 'IS NULL or IS NOT NULL',
    briefExplanation: 'NULL represents missing data. Use IS NULL (not = NULL) because NULL isn\'t equal to anything, including itself.',
    relatedConcepts: ['null-handling', 'sql-basics']
  },
  {
    id: 'ml-concepts-024',
    type: 'flashcard',
    category: 'ml-concepts',
    subcategory: 'learning-curves',
    difficulty: 'intermediate',
    question: 'What do learning curves show?',
    correctAnswer: 'Model performance on training and validation sets as training data size increases',
    briefExplanation: 'Learning curves plot accuracy vs training set size. They help diagnose bias/variance issues and determine if more data helps.',
    relatedConcepts: ['learning-curves', 'model-diagnostics']
  },
  {
    id: 'py-pd-007',
    type: 'predict-output',
    category: 'python',
    subcategory: 'pandas-sorting',
    difficulty: 'beginner',
    question: 'What happens to the DataFrame?',
    codeSnippet: 'df.sort_values(\'price\', ascending=False, inplace=True)',
    correctAnswer: 'df is sorted by price in descending order and modified in place',
    briefExplanation: 'sort_values sorts the DataFrame. ascending=False means highest first. inplace=True modifies df directly (no return).',
    relatedConcepts: ['pandas-sorting', 'inplace-operations']
  },
  {
    id: 'ml-concepts-025',
    type: 'fill-blank',
    category: 'ml-concepts',
    subcategory: 'embedding',
    difficulty: 'advanced',
    question: 'Word embeddings like Word2Vec represent words as dense ____ vectors.',
    correctAnswer: 'numerical',
    briefExplanation: 'Embeddings convert words to continuous numerical vectors that capture semantic meaning. Similar words have similar vectors.',
    relatedConcepts: ['embeddings', 'nlp', 'word2vec']
  },
  {
    id: 'py-basic-005',
    type: 'multiple-choice',
    category: 'python',
    subcategory: 'exception-handling',
    difficulty: 'beginner',
    question: 'What does the finally block do in exception handling?',
    options: [
      'Executes regardless of whether an exception occurred',
      'Only runs if an exception occurs',
      'Only runs if no exception occurs',
      'Prevents exceptions from happening'
    ],
    correctAnswer: 'Executes regardless of whether an exception occurred',
    briefExplanation: 'finally always runs after try/except, whether an exception occurred or not. Used for cleanup (closing files, etc.).',
    relatedConcepts: ['exception-handling', 'try-except-finally']
  },
  {
    id: 'sql-join-005',
    type: 'explain-code',
    category: 'sql',
    subcategory: 'self-join',
    difficulty: 'advanced',
    question: 'What is this query doing?',
    codeSnippet: 'SELECT e1.name, e2.name AS manager\nFROM employees e1\nJOIN employees e2 ON e1.manager_id = e2.id',
    correctAnswer: 'Self-join to match employees with their managers from the same table',
    briefExplanation: 'Self-join joins a table to itself. Here, we match each employee (e1) with their manager (e2) using manager_id.',
    relatedConcepts: ['self-join', 'sql-joins']
  },
  {
    id: 'ml-concepts-026',
    type: 'flashcard',
    category: 'ml-concepts',
    subcategory: 'attention-mechanism',
    difficulty: 'advanced',
    question: 'What problem do attention mechanisms solve in neural networks?',
    correctAnswer: 'Allow models to focus on relevant parts of input rather than processing everything equally',
    briefExplanation: 'Attention lets models weigh input importance. In translation, it focuses on relevant source words for each target word.',
    relatedConcepts: ['attention-mechanism', 'transformers', 'seq2seq']
  },
  {
    id: 'py-np-008',
    type: 'multiple-choice',
    category: 'python',
    subcategory: 'numpy-axis',
    difficulty: 'intermediate',
    question: 'What does axis=0 mean in NumPy operations?',
    options: [
      'Operate along rows (vertically)',
      'Operate along columns (horizontally)',
      'Flatten the array',
      'Transpose the array'
    ],
    correctAnswer: 'Operate along rows (vertically)',
    briefExplanation: 'axis=0 operates down rows (vertically). axis=1 operates across columns (horizontally). np.sum(arr, axis=0) sums each column.',
    relatedConcepts: ['numpy-axis', 'array-operations']
  },
  {
    id: 'sql-agg-005',
    type: 'predict-output',
    category: 'sql',
    subcategory: 'distinct',
    difficulty: 'beginner',
    question: 'What does this return?',
    codeSnippet: 'SELECT COUNT(DISTINCT city) FROM customers',
    correctAnswer: 'The number of unique cities',
    briefExplanation: 'DISTINCT removes duplicates before counting. Returns how many different cities exist in the customers table.',
    relatedConcepts: ['distinct', 'sql-aggregation']
  },
  {
    id: 'ml-concepts-027',
    type: 'explain-code',
    category: 'ml-concepts',
    subcategory: 'softmax',
    difficulty: 'intermediate',
    question: 'What does the softmax function do?',
    codeSnippet: 'def softmax(x):\n    exp_x = np.exp(x - np.max(x))\n    return exp_x / exp_x.sum()',
    correctAnswer: 'Converts logits to probability distribution that sums to 1',
    briefExplanation: 'Softmax normalizes outputs to probabilities [0,1] that sum to 1. Used in multi-class classification output layers.',
    relatedConcepts: ['softmax', 'activation-functions', 'multi-class-classification']
  },
  {
    id: 'py-pd-008',
    type: 'fill-blank',
    category: 'python',
    subcategory: 'pandas-concat',
    difficulty: 'intermediate',
    question: 'Use pd.____([df1, df2], axis=0) to stack DataFrames vertically.',
    correctAnswer: 'concat',
    briefExplanation: 'pd.concat() combines DataFrames. axis=0 stacks vertically (rows), axis=1 horizontally (columns).',
    relatedConcepts: ['pandas-concat', 'dataframe-operations']
  },
  {
    id: 'ml-concepts-028',
    type: 'multiple-choice',
    category: 'ml-concepts',
    subcategory: 'gradient-clipping',
    difficulty: 'advanced',
    question: 'What is gradient clipping used for?',
    options: [
      'Preventing exploding gradients during training',
      'Speeding up convergence',
      'Reducing model size',
      'Increasing accuracy'
    ],
    correctAnswer: 'Preventing exploding gradients during training',
    briefExplanation: 'Gradient clipping caps gradient magnitudes to a threshold. Prevents exploding gradients, especially in RNNs.',
    relatedConcepts: ['gradient-clipping', 'exploding-gradients', 'rnn']
  },
  {
    id: 'py-basic-006',
    type: 'predict-output',
    category: 'python',
    subcategory: 'string-operations',
    difficulty: 'beginner',
    question: 'What is the output?',
    codeSnippet: '\', \'.join([\'a\', \'b\', \'c\'])',
    correctAnswer: 'a, b, c',
    briefExplanation: 'join() concatenates list elements with the separator. \', \' joins the strings with comma-space between them.',
    relatedConcepts: ['string-operations', 'python-basics']
  },
  {
    id: 'sql-basic-006',
    type: 'flashcard',
    category: 'sql',
    subcategory: 'limit-offset',
    difficulty: 'beginner',
    question: 'What do LIMIT and OFFSET do in SQL queries?',
    correctAnswer: 'LIMIT restricts number of rows returned, OFFSET skips first N rows',
    briefExplanation: 'LIMIT caps results. OFFSET skips rows. Together: pagination. "LIMIT 10 OFFSET 20" gets rows 21-30.',
    relatedConcepts: ['limit-offset', 'pagination']
  },
  {
    id: 'ml-concepts-029',
    type: 'spot-bug',
    category: 'ml-concepts',
    subcategory: 'data-leakage',
    difficulty: 'intermediate',
    question: 'Spot the data leakage:',
    codeSnippet: 'scaler = StandardScaler().fit(X)  # X is all data\nX_train, X_test = train_test_split(X)\nX_train_scaled = scaler.transform(X_train)\nX_test_scaled = scaler.transform(X_test)',
    correctAnswer: 'Scaler fitted on all data before split, leaking test data statistics into training',
    briefExplanation: 'Fit scaler only on training data after split. Fitting on all data leaks test set information, inflating performance estimates.',
    relatedConcepts: ['data-leakage', 'train-test-split', 'preprocessing']
  },
  {
    id: 'py-pd-009',
    type: 'explain-code',
    category: 'python',
    subcategory: 'pandas-pivot',
    difficulty: 'advanced',
    question: 'What does pivot_table do?',
    codeSnippet: 'df.pivot_table(values=\'sales\', index=\'region\', columns=\'product\', aggfunc=\'sum\')',
    correctAnswer: 'Creates a spreadsheet-style table with regions as rows, products as columns, showing sum of sales',
    briefExplanation: 'pivot_table reshapes data. Rows=regions, columns=products, cells=sum of sales. Like Excel pivot tables.',
    relatedConcepts: ['pandas-pivot', 'data-reshaping']
  },
  {
    id: 'ml-concepts-030',
    type: 'fill-blank',
    category: 'ml-concepts',
    subcategory: 'k-means',
    difficulty: 'beginner',
    question: 'K-means is an ____ learning algorithm for clustering.',
    correctAnswer: 'unsupervised',
    briefExplanation: 'K-means is unsupervised - it finds patterns without labeled data. It groups data into K clusters based on similarity.',
    relatedConcepts: ['k-means', 'unsupervised-learning', 'clustering']
  }
];

export default questions;
