import type { LearningResource } from '../types';

export const learningResources: Record<string, LearningResource> = {
  // ========================================
  // NEURAL NETWORKS & DEEP LEARNING
  // ========================================
  'activation-functions': {
    concept: 'activation-functions',
    resources: {
      video: {
        title: 'Activation Functions in Neural Networks',
        url: 'https://www.youtube.com/watch?v=m0pIlLfpXWE',
        duration: '8 min',
        provider: 'DeepLearning.AI'
      },
      article: {
        title: 'Activation Functions Explained',
        url: 'https://towardsdatascience.com/activation-functions-neural-networks-1cbd9f8d91d6',
        readTime: '10 min'
      },
      interactive: {
        title: 'TensorFlow Playground',
        url: 'https://playground.tensorflow.org/',
        description: 'Visualize different activation functions'
      }
    },
    prerequisites: ['neural-network-basics']
  },

  'backpropagation': {
    concept: 'backpropagation',
    resources: {
      video: {
        title: 'What is backpropagation really doing?',
        url: 'https://www.youtube.com/watch?v=Ilg3gGewQ5U',
        duration: '14 min',
        provider: '3Blue1Brown'
      },
      article: {
        title: 'Calculus on Computational Graphs: Backpropagation',
        url: 'https://colah.github.io/posts/2015-08-Backprop/',
        readTime: '15 min'
      },
      interactive: {
        title: 'TensorFlow Playground - See backprop in action',
        url: 'https://playground.tensorflow.org/',
        description: 'Visualize how networks learn'
      }
    },
    prerequisites: ['gradient-descent', 'chain-rule']
  },

  'gradient-descent': {
    concept: 'gradient-descent',
    resources: {
      video: {
        title: 'Gradient Descent, Step-by-Step',
        url: 'https://www.youtube.com/watch?v=sDv4f4s2SB8',
        duration: '9 min',
        provider: 'StatQuest'
      },
      article: {
        title: 'An overview of gradient descent optimization algorithms',
        url: 'https://ruder.io/optimizing-gradient-descent/',
        readTime: '20 min'
      },
      interactive: {
        title: 'Gradient Descent Visualizer',
        url: 'https://uclaacm.github.io/gradient-descent-visualiser/',
        description: 'Interactive visualization'
      }
    }
  },

  'neural-network-basics': {
    concept: 'neural-network-basics',
    resources: {
      video: {
        title: 'But what is a neural network?',
        url: 'https://www.youtube.com/watch?v=aircAruvnKk',
        duration: '19 min',
        provider: '3Blue1Brown'
      },
      article: {
        title: 'A Neural Network in 11 lines of Python',
        url: 'https://iamtrask.github.io/2015/07/12/basic-python-network/',
        readTime: '12 min'
      },
      practice: {
        title: 'Kaggle: Intro to Deep Learning',
        url: 'https://www.kaggle.com/learn/intro-to-deep-learning',
        description: 'Hands-on neural network exercises'
      }
    }
  },

  'cnn-architecture': {
    concept: 'cnn-architecture',
    resources: {
      video: {
        title: 'Convolutional Neural Networks (CNNs) explained',
        url: 'https://www.youtube.com/watch?v=YRhxdVk_sIs',
        duration: '9 min',
        provider: 'CodeEmporium'
      },
      article: {
        title: 'Understanding Convolutional Neural Networks',
        url: 'https://towardsdatascience.com/a-comprehensive-guide-to-convolutional-neural-networks-the-eli5-way-3bd2b1164a53',
        readTime: '15 min'
      },
      interactive: {
        title: 'CNN Explainer',
        url: 'https://poloclub.github.io/cnn-explainer/',
        description: 'Interactive CNN visualization'
      }
    },
    prerequisites: ['neural-network-basics']
  },

  'convolutional-layers': {
    concept: 'convolutional-layers',
    resources: {
      video: {
        title: 'Convolutional Layers - Deep Learning',
        url: 'https://www.youtube.com/watch?v=KuXjwB4LzSA',
        duration: '10 min',
        provider: 'Andrew Ng'
      },
      article: {
        title: 'Convolutional Layers Explained',
        url: 'https://cs231n.github.io/convolutional-networks/',
        readTime: '25 min'
      },
      interactive: {
        title: 'Convolution Visualizer',
        url: 'https://ezyang.github.io/convolution-visualizer/',
        description: 'See convolution in action'
      }
    },
    prerequisites: ['cnn-architecture']
  },

  'pooling-layers': {
    concept: 'pooling-layers',
    resources: {
      video: {
        title: 'Pooling Layers',
        url: 'https://www.youtube.com/watch?v=8oOgPUO-TBY',
        duration: '7 min',
        provider: 'DeepLearning.AI'
      },
      article: {
        title: 'Understanding Pooling Layers',
        url: 'https://machinelearningmastery.com/pooling-layers-for-convolutional-neural-networks/',
        readTime: '10 min'
      }
    },
    prerequisites: ['cnn-architecture']
  },

  // ========================================
  // OPTIMIZATION & TRAINING
  // ========================================
  'loss-functions': {
    concept: 'loss-functions',
    resources: {
      video: {
        title: 'Loss Functions Explained',
        url: 'https://www.youtube.com/watch?v=QBbC3Cjsnjg',
        duration: '12 min',
        provider: 'StatQuest'
      },
      article: {
        title: 'Understanding Loss Functions',
        url: 'https://towardsdatascience.com/understanding-different-loss-functions-for-neural-networks-dd1ed0274718',
        readTime: '12 min'
      },
      documentation: {
        title: 'Keras Loss Functions',
        url: 'https://keras.io/api/losses/'
      }
    },
    prerequisites: ['neural-network-basics']
  },

  'adam-optimizer': {
    concept: 'adam-optimizer',
    resources: {
      video: {
        title: 'Adam Optimizer Explained',
        url: 'https://www.youtube.com/watch?v=JXQT_vxqwIs',
        duration: '11 min',
        provider: 'Normalized Nerd'
      },
      article: {
        title: 'Adam Optimization Algorithm',
        url: 'https://machinelearningmastery.com/adam-optimization-algorithm-for-deep-learning/',
        readTime: '15 min'
      }
    },
    prerequisites: ['gradient-descent']
  },

  'learning-rate': {
    concept: 'learning-rate',
    resources: {
      video: {
        title: 'Understanding Learning Rate',
        url: 'https://www.youtube.com/watch?v=Q81RR3yKn30',
        duration: '8 min',
        provider: 'DeepLearning.AI'
      },
      article: {
        title: 'Setting the Learning Rate',
        url: 'https://machinelearningmastery.com/understand-the-dynamics-of-learning-rate-on-deep-learning-neural-networks/',
        readTime: '18 min'
      },
      interactive: {
        title: 'Learning Rate Finder',
        url: 'https://sgugger.github.io/how-do-you-find-a-good-learning-rate.html',
        description: 'Visualize learning rate effects'
      }
    },
    prerequisites: ['gradient-descent']
  },

  // ========================================
  // REGULARIZATION & OVERFITTING
  // ========================================
  'overfitting': {
    concept: 'overfitting',
    resources: {
      video: {
        title: 'Overfitting and Underfitting',
        url: 'https://www.youtube.com/watch?v=EuBBz3bI-aA',
        duration: '7 min',
        provider: 'Simplilearn'
      },
      article: {
        title: 'Overfitting vs Underfitting',
        url: 'https://towardsdatascience.com/overfitting-vs-underfitting-a-complete-example-d05dd7e19765',
        readTime: '12 min'
      },
      practice: {
        title: 'Kaggle: Intermediate ML - Overfitting',
        url: 'https://www.kaggle.com/learn/intermediate-machine-learning',
        description: 'Hands-on exercises'
      }
    },
    prerequisites: ['train-test-split', 'model-evaluation']
  },

  'regularization': {
    concept: 'regularization',
    resources: {
      video: {
        title: 'Regularization in Machine Learning',
        url: 'https://www.youtube.com/watch?v=sO4ZirJh9ds',
        duration: '10 min',
        provider: 'StatQuest'
      },
      article: {
        title: 'L1 and L2 Regularization Methods',
        url: 'https://towardsdatascience.com/l1-and-l2-regularization-methods-ce25e7fc831c',
        readTime: '10 min'
      }
    },
    prerequisites: ['overfitting']
  },

  'dropout': {
    concept: 'dropout',
    resources: {
      video: {
        title: 'Dropout in Neural Networks',
        url: 'https://www.youtube.com/watch?v=ARq74QuavAo',
        duration: '6 min',
        provider: 'DeepLearning.AI'
      },
      article: {
        title: 'Understanding Dropout',
        url: 'https://machinelearningmastery.com/dropout-for-regularizing-deep-neural-networks/',
        readTime: '12 min'
      }
    },
    prerequisites: ['overfitting', 'regularization']
  },

  'batch-normalization': {
    concept: 'batch-normalization',
    resources: {
      video: {
        title: 'Batch Normalization Explained',
        url: 'https://www.youtube.com/watch?v=DtEq44FTPM4',
        duration: '9 min',
        provider: 'Normalized Nerd'
      },
      article: {
        title: 'Understanding Batch Normalization',
        url: 'https://towardsdatascience.com/batch-normalization-in-neural-networks-1ac91516821c',
        readTime: '10 min'
      }
    },
    prerequisites: ['neural-network-basics']
  },

  'early-stopping': {
    concept: 'early-stopping',
    resources: {
      video: {
        title: 'Early Stopping - ML Technique',
        url: 'https://www.youtube.com/watch?v=NnS0FJyVcDQ',
        duration: '5 min',
        provider: 'Coding Lane'
      },
      article: {
        title: 'Early Stopping to Avoid Overfitting',
        url: 'https://machinelearningmastery.com/early-stopping-to-avoid-overtraining-neural-network-models/',
        readTime: '8 min'
      }
    },
    prerequisites: ['overfitting', 'train-test-split']
  },

  // ========================================
  // MODEL EVALUATION
  // ========================================
  'train-test-split': {
    concept: 'train-test-split',
    resources: {
      video: {
        title: 'Train/Test Split Explained',
        url: 'https://www.youtube.com/watch?v=fwY9Qv96DJY',
        duration: '7 min',
        provider: 'StatQuest'
      },
      article: {
        title: 'Train-Test Split for Evaluating Models',
        url: 'https://machinelearningmastery.com/train-test-split-for-evaluating-machine-learning-algorithms/',
        readTime: '10 min'
      }
    }
  },

  'confusion-matrix': {
    concept: 'confusion-matrix',
    resources: {
      video: {
        title: 'Confusion Matrix Explained',
        url: 'https://www.youtube.com/watch?v=Kdsp6soqA7o',
        duration: '9 min',
        provider: 'StatQuest'
      },
      article: {
        title: 'Understanding the Confusion Matrix',
        url: 'https://towardsdatascience.com/understanding-confusion-matrix-a9ad42dcfd62',
        readTime: '8 min'
      },
      interactive: {
        title: 'Confusion Matrix Calculator',
        url: 'https://www.statology.org/confusion-matrix-calculator/',
        description: 'Interactive confusion matrix tool'
      }
    },
    prerequisites: ['classification']
  },

  'precision-recall': {
    concept: 'precision-recall',
    resources: {
      video: {
        title: 'Precision and Recall Clearly Explained',
        url: 'https://www.youtube.com/watch?v=jJ7ff7Gcq34',
        duration: '5 min',
        provider: 'Normalized Nerd'
      },
      article: {
        title: 'Precision vs Recall',
        url: 'https://towardsdatascience.com/precision-vs-recall-386cf9f89488',
        readTime: '7 min'
      }
    },
    prerequisites: ['confusion-matrix']
  },

  'roc-curve': {
    concept: 'roc-curve',
    resources: {
      video: {
        title: 'ROC and AUC, Clearly Explained!',
        url: 'https://www.youtube.com/watch?v=4jRBRDbJemM',
        duration: '16 min',
        provider: 'StatQuest'
      },
      article: {
        title: 'Understanding AUC-ROC Curve',
        url: 'https://towardsdatascience.com/understanding-auc-roc-curve-68b2303cc9c5',
        readTime: '12 min'
      },
      interactive: {
        title: 'ROC Curve Explorer',
        url: 'http://www.navan.name/roc/',
        description: 'Interactive ROC visualization'
      }
    },
    prerequisites: ['classification', 'confusion-matrix']
  },

  'cross-validation': {
    concept: 'cross-validation',
    resources: {
      video: {
        title: 'Cross Validation Explained',
        url: 'https://www.youtube.com/watch?v=fSytzGwwBVw',
        duration: '6 min',
        provider: 'StatQuest'
      },
      article: {
        title: 'K-Fold Cross-Validation',
        url: 'https://machinelearningmastery.com/k-fold-cross-validation/',
        readTime: '10 min'
      },
      practice: {
        title: 'Scikit-learn Cross-validation Guide',
        url: 'https://scikit-learn.org/stable/modules/cross_validation.html',
        description: 'Practical implementation'
      }
    },
    prerequisites: ['train-test-split']
  },

  // ========================================
  // PYTHON - NUMPY
  // ========================================
  'numpy-basics': {
    concept: 'numpy-basics',
    resources: {
      video: {
        title: 'NumPy Tutorial for Beginners',
        url: 'https://www.youtube.com/watch?v=QUT1VHiLmmI',
        duration: '58 min',
        provider: 'freeCodeCamp'
      },
      article: {
        title: 'NumPy Quickstart Tutorial',
        url: 'https://numpy.org/doc/stable/user/quickstart.html',
        readTime: '20 min'
      },
      practice: {
        title: '100 NumPy Exercises',
        url: 'https://github.com/rougier/numpy-100',
        description: 'Practice problems with solutions'
      }
    }
  },

  'numpy-operations': {
    concept: 'numpy-operations',
    resources: {
      video: {
        title: 'NumPy Array Operations',
        url: 'https://www.youtube.com/watch?v=8Y0qQEh7dJg',
        duration: '15 min',
        provider: 'Keith Galli'
      },
      article: {
        title: 'NumPy Array Operations',
        url: 'https://realpython.com/numpy-array-programming/',
        readTime: '25 min'
      },
      documentation: {
        title: 'NumPy Mathematical Functions',
        url: 'https://numpy.org/doc/stable/reference/routines.math.html'
      }
    },
    prerequisites: ['numpy-basics']
  },

  'numpy-broadcasting': {
    concept: 'numpy-broadcasting',
    resources: {
      video: {
        title: 'NumPy Broadcasting Explained',
        url: 'https://www.youtube.com/watch?v=oG1t3qlzq14',
        duration: '11 min',
        provider: 'Mr. P Solver'
      },
      article: {
        title: 'Broadcasting in NumPy',
        url: 'https://numpy.org/doc/stable/user/basics.broadcasting.html',
        readTime: '15 min'
      }
    },
    prerequisites: ['numpy-basics']
  },

  'numpy-indexing': {
    concept: 'numpy-indexing',
    resources: {
      video: {
        title: 'NumPy Indexing and Slicing',
        url: 'https://www.youtube.com/watch?v=4_4WZUTdvEo',
        duration: '13 min',
        provider: 'Keith Galli'
      },
      article: {
        title: 'NumPy Indexing and Slicing',
        url: 'https://realpython.com/numpy-array-indexing/',
        readTime: '20 min'
      }
    },
    prerequisites: ['numpy-basics']
  },

  // ========================================
  // PYTHON - PANDAS
  // ========================================
  'pandas-groupby': {
    concept: 'pandas-groupby',
    resources: {
      video: {
        title: 'Pandas groupby explained',
        url: 'https://www.youtube.com/watch?v=txMdrV1Ut64',
        duration: '12 min',
        provider: 'Data School'
      },
      article: {
        title: 'Pandas GroupBy: Your Guide',
        url: 'https://realpython.com/pandas-groupby/',
        readTime: '25 min'
      },
      documentation: {
        title: 'Pandas groupby documentation',
        url: 'https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.groupby.html'
      }
    }
  },

  'pandas-joins': {
    concept: 'pandas-joins',
    resources: {
      video: {
        title: 'Pandas merge, join, and concat',
        url: 'https://www.youtube.com/watch?v=g7n1MZyYjOM',
        duration: '18 min',
        provider: 'Data School'
      },
      article: {
        title: 'Combining Data in Pandas',
        url: 'https://realpython.com/pandas-merge-join-and-concat/',
        readTime: '30 min'
      }
    }
  },

  'pandas-apply': {
    concept: 'pandas-apply',
    resources: {
      video: {
        title: 'Pandas apply, map, and applymap',
        url: 'https://www.youtube.com/watch?v=P_q0tkYqvSk',
        duration: '10 min',
        provider: 'Data School'
      },
      article: {
        title: 'When to Use apply() in Pandas',
        url: 'https://towardsdatascience.com/apply-and-lambda-usage-in-pandas-b13a1ea037f7',
        readTime: '10 min'
      }
    }
  },

  'pandas-indexing': {
    concept: 'pandas-indexing',
    resources: {
      video: {
        title: 'Pandas loc vs iloc',
        url: 'https://www.youtube.com/watch?v=xvpNA7bC8cs',
        duration: '8 min',
        provider: 'Data School'
      },
      article: {
        title: 'Pandas iloc and loc - Indexing and Selecting Data',
        url: 'https://www.shanelynn.ie/select-pandas-dataframe-rows-and-columns-using-iloc-loc-and-ix/',
        readTime: '12 min'
      }
    }
  },

  // ========================================
  // SQL
  // ========================================
  'sql-joins': {
    concept: 'sql-joins',
    resources: {
      video: {
        title: 'SQL Joins Explained',
        url: 'https://www.youtube.com/watch?v=9yeOJ0ZMUYw',
        duration: '11 min',
        provider: 'Programming with Mosh'
      },
      article: {
        title: 'Visual Representation of SQL Joins',
        url: 'https://www.sql-join.com/sql-join-types',
        readTime: '8 min'
      },
      interactive: {
        title: 'SQLBolt - Interactive SQL Lessons',
        url: 'https://sqlbolt.com/lesson/select_queries_with_joins',
        description: 'Practice SQL joins with exercises'
      }
    }
  },

  'sql-aggregation': {
    concept: 'sql-aggregation',
    resources: {
      video: {
        title: 'SQL Aggregate Functions',
        url: 'https://www.youtube.com/watch?v=Ep_preNH-0s',
        duration: '8 min',
        provider: 'Programming with Mosh'
      },
      article: {
        title: 'SQL Aggregate Functions Explained',
        url: 'https://www.sqltutorial.org/sql-aggregate-functions/',
        readTime: '10 min'
      },
      interactive: {
        title: 'SQLBolt - Queries with Aggregates',
        url: 'https://sqlbolt.com/lesson/select_queries_with_aggregates',
        description: 'Interactive aggregate exercises'
      }
    }
  },

  'group-by': {
    concept: 'group-by',
    resources: {
      video: {
        title: 'SQL GROUP BY Explained',
        url: 'https://www.youtube.com/watch?v=mTT1dQWS2iU',
        duration: '10 min',
        provider: 'The Net Ninja'
      },
      article: {
        title: 'SQL GROUP BY Statement',
        url: 'https://www.sqlshack.com/sql-group-by-clause/',
        readTime: '12 min'
      }
    },
    prerequisites: ['sql-aggregation']
  },

  'having-clause': {
    concept: 'having-clause',
    resources: {
      video: {
        title: 'SQL HAVING Clause',
        url: 'https://www.youtube.com/watch?v=8Z-s5jVizFQ',
        duration: '7 min',
        provider: 'kudvenkat'
      },
      article: {
        title: 'WHERE vs HAVING in SQL',
        url: 'https://www.geeksforgeeks.org/having-vs-where-clause-in-sql/',
        readTime: '5 min'
      }
    },
    prerequisites: ['group-by']
  },

  'subqueries': {
    concept: 'subqueries',
    resources: {
      video: {
        title: 'SQL Subqueries in 8 Minutes',
        url: 'https://www.youtube.com/watch?v=nJIEIzF7tDw',
        duration: '8 min',
        provider: 'Socratica'
      },
      article: {
        title: 'SQL Subquery Tutorial',
        url: 'https://www.sqltutorial.org/sql-subquery/',
        readTime: '15 min'
      },
      practice: {
        title: 'LeetCode SQL Practice',
        url: 'https://leetcode.com/problemset/database/',
        description: 'Practice SQL problems'
      }
    }
  },

  // ========================================
  // ADDITIONAL ML CONCEPTS
  // ========================================
  'bias-variance-tradeoff': {
    concept: 'bias-variance-tradeoff',
    resources: {
      video: {
        title: 'Bias and Variance',
        url: 'https://www.youtube.com/watch?v=EuBBz3bI-aA',
        duration: '7 min',
        provider: 'StatQuest'
      },
      article: {
        title: 'Understanding the Bias-Variance Tradeoff',
        url: 'https://towardsdatascience.com/understanding-the-bias-variance-tradeoff-165e6942b229',
        readTime: '10 min'
      }
    },
    prerequisites: ['overfitting']
  },

  'decision-trees': {
    concept: 'decision-trees',
    resources: {
      video: {
        title: 'Decision Trees',
        url: 'https://www.youtube.com/watch?v=_L39rN6gz7Y',
        duration: '17 min',
        provider: 'StatQuest'
      },
      article: {
        title: 'Decision Trees in Machine Learning',
        url: 'https://towardsdatascience.com/decision-trees-in-machine-learning-641b9c4e8052',
        readTime: '12 min'
      },
      practice: {
        title: 'Scikit-learn Decision Tree Tutorial',
        url: 'https://scikit-learn.org/stable/modules/tree.html',
        description: 'Hands-on implementation'
      }
    }
  },

  'random-forest': {
    concept: 'random-forest',
    resources: {
      video: {
        title: 'Random Forest Algorithm',
        url: 'https://www.youtube.com/watch?v=J4Wdy0Wc_xQ',
        duration: '9 min',
        provider: 'StatQuest'
      },
      article: {
        title: 'Random Forest Simple Explanation',
        url: 'https://towardsdatascience.com/understanding-random-forest-58381e0602d2',
        readTime: '10 min'
      }
    },
    prerequisites: ['decision-trees', 'ensemble-methods']
  },

  'k-means': {
    concept: 'k-means',
    resources: {
      video: {
        title: 'K-Means Clustering',
        url: 'https://www.youtube.com/watch?v=4b5d3muPQmA',
        duration: '9 min',
        provider: 'StatQuest'
      },
      article: {
        title: 'K-Means Clustering Introduction',
        url: 'https://towardsdatascience.com/understanding-k-means-clustering-in-machine-learning-6a6e67336aa1',
        readTime: '10 min'
      },
      interactive: {
        title: 'K-Means Visualizer',
        url: 'https://www.naftaliharris.com/blog/visualizing-k-means-clustering/',
        description: 'Interactive clustering visualization'
      }
    }
  },

  'feature-engineering': {
    concept: 'feature-engineering',
    resources: {
      video: {
        title: 'Feature Engineering for Machine Learning',
        url: 'https://www.youtube.com/watch?v=8w3LEv0fFs0',
        duration: '13 min',
        provider: 'Krish Naik'
      },
      article: {
        title: 'Feature Engineering Techniques',
        url: 'https://towardsdatascience.com/feature-engineering-for-machine-learning-3a5e293a5114',
        readTime: '15 min'
      },
      practice: {
        title: 'Kaggle: Feature Engineering',
        url: 'https://www.kaggle.com/learn/feature-engineering',
        description: 'Hands-on feature engineering course'
      }
    }
  },

  'transfer-learning': {
    concept: 'transfer-learning',
    resources: {
      video: {
        title: 'Transfer Learning Explained',
        url: 'https://www.youtube.com/watch?v=yofjFQddwHE',
        duration: '10 min',
        provider: 'Simplilearn'
      },
      article: {
        title: 'A Comprehensive Hands-on Guide to Transfer Learning',
        url: 'https://towardsdatascience.com/a-comprehensive-hands-on-guide-to-transfer-learning-with-real-world-applications-in-deep-learning-212bf3b2f27a',
        readTime: '20 min'
      }
    },
    prerequisites: ['neural-network-basics', 'cnn-architecture']
  },

  'lstm': {
    concept: 'lstm',
    resources: {
      video: {
        title: 'LSTM Networks - EXPLAINED!',
        url: 'https://www.youtube.com/watch?v=YCzL96nL7j0',
        duration: '10 min',
        provider: 'CodeEmporium'
      },
      article: {
        title: 'Understanding LSTM Networks',
        url: 'https://colah.github.io/posts/2015-08-Understanding-LSTMs/',
        readTime: '20 min'
      }
    },
    prerequisites: ['rnn', 'gradient-problems']
  },

  'attention-mechanism': {
    concept: 'attention-mechanism',
    resources: {
      video: {
        title: 'Attention Mechanism Explained',
        url: 'https://www.youtube.com/watch?v=fjJOgb-E41w',
        duration: '13 min',
        provider: 'CodeEmporium'
      },
      article: {
        title: 'Visualizing A Neural Machine Translation Model',
        url: 'https://jalammar.github.io/visualizing-neural-machine-translation-mechanics-of-seq2seq-models-with-attention/',
        readTime: '15 min'
      }
    },
    prerequisites: ['lstm', 'seq2seq']
  },

  'data-leakage': {
    concept: 'data-leakage',
    resources: {
      video: {
        title: 'Data Leakage in Machine Learning',
        url: 'https://www.youtube.com/watch?v=YqfdKFLu1w0',
        duration: '8 min',
        provider: 'Kaggle'
      },
      article: {
        title: 'Data Leakage in Machine Learning',
        url: 'https://machinelearningmastery.com/data-leakage-machine-learning/',
        readTime: '12 min'
      }
    },
    prerequisites: ['train-test-split']
  },

  'sklearn-pipeline': {
    concept: 'sklearn-pipeline',
    resources: {
      video: {
        title: 'Sklearn Pipelines',
        url: 'https://www.youtube.com/watch?v=0UWXCAYn8rk',
        duration: '18 min',
        provider: 'Data School'
      },
      article: {
        title: 'Scikit-learn Pipeline Tutorial',
        url: 'https://towardsdatascience.com/a-simple-example-of-pipeline-in-machine-learning-with-scikit-learn-e726ffbb6976',
        readTime: '10 min'
      },
      documentation: {
        title: 'Sklearn Pipeline Documentation',
        url: 'https://scikit-learn.org/stable/modules/compose.html'
      }
    }
  },

  'feature-scaling': {
    concept: 'feature-scaling',
    resources: {
      video: {
        title: 'Feature Scaling in Machine Learning',
        url: 'https://www.youtube.com/watch?v=mnKm3YP56PY',
        duration: '9 min',
        provider: 'Krish Naik'
      },
      article: {
        title: 'Feature Scaling - StandardScaler vs MinMaxScaler',
        url: 'https://towardsdatascience.com/all-about-feature-scaling-bcc0ad75cb35',
        readTime: '10 min'
      }
    }
  }
};

export default learningResources;
