document.addEventListener('DOMContentLoaded', function() {
    const textInput = document.getElementById('textInput');
    const sentenceCount = document.getElementById('sentenceCount');
    const summarizeBtn = document.getElementById('summarizeBtn');
    const outputSection = document.getElementById('outputSection');
    const summaryOutput = document.getElementById('summaryOutput');
    const stats = document.getElementById('stats');
    const loading = document.getElementById('loading');
    const errorMessage = document.getElementById('errorMessage');
    const errorText = document.getElementById('errorText');
    const copyBtn = document.getElementById('copyBtn');
    const clearBtn = document.getElementById('clearBtn');

    // Add input validation
    textInput.addEventListener('input', function() {
        const hasText = textInput.value.trim().length > 0;
        summarizeBtn.disabled = !hasText;
        
        if (hasText) {
            hideError();
        }
    });

    // Handle summarize button click
    summarizeBtn.addEventListener('click', async function() {
        const text = textInput.value.trim();
        
        if (!text) {
            showError('Please enter some text to summarize.');
            return;
        }

        if (text.length < 10) {
            showError('Please enter at least 10 characters for meaningful summarization.');
            return;
        }

        await summarizeText(text, parseInt(sentenceCount.value));
    });

    // Handle copy button
    copyBtn.addEventListener('click', function() {
        const summaryText = summaryOutput.textContent;
        navigator.clipboard.writeText(summaryText).then(function() {
            // Visual feedback
            const originalText = copyBtn.innerHTML;
            copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
            copyBtn.style.background = '#28a745';
            copyBtn.style.borderColor = '#28a745';
            copyBtn.style.color = 'white';
            
            setTimeout(function() {
                copyBtn.innerHTML = originalText;
                copyBtn.style.background = '';
                copyBtn.style.borderColor = '';
                copyBtn.style.color = '';
            }, 2000);
        }).catch(function() {
            showError('Failed to copy text to clipboard.');
        });
    });

    // Handle clear button
    clearBtn.addEventListener('click', function() {
        textInput.value = '';
        hideOutput();
        hideError();
        summarizeBtn.disabled = true;
        textInput.focus();
    });

    // Handle Enter key in textarea (Ctrl+Enter to summarize)
    textInput.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.key === 'Enter') {
            e.preventDefault();
            summarizeBtn.click();
        }
    });

    async function summarizeText(text, numSentences) {
        showLoading();
        hideError();
        hideOutput();

        try {
            const response = await fetch('/api/summarize', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    text: text,
                    num_sentences: numSentences
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to summarize text');
            }

            showSummary(data);
        } catch (error) {
            console.error('Error:', error);
            showError(error.message || 'An error occurred while summarizing the text.');
        } finally {
            hideLoading();
        }
    }

    function showSummary(data) {
        summaryOutput.textContent = data.summary;
        
        const compressionRatio = ((data.original_length - data.summary_length) / data.original_length * 100).toFixed(1);
        stats.textContent = `${data.summary_length} characters (${compressionRatio}% compression)`;
        
        outputSection.style.display = 'block';
        
        // Smooth scroll to output
        outputSection.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'nearest' 
        });
    }

    function showLoading() {
        loading.style.display = 'block';
        summarizeBtn.disabled = true;
    }

    function hideLoading() {
        loading.style.display = 'none';
        summarizeBtn.disabled = false;
    }

    function showError(message) {
        errorText.textContent = message;
        errorMessage.style.display = 'flex';
        
        // Auto-hide error after 5 seconds
        setTimeout(hideError, 5000);
    }

    function hideError() {
        errorMessage.style.display = 'none';
    }

    function hideOutput() {
        outputSection.style.display = 'none';
    }

    // Add some sample text for demo purposes
    const sampleTexts = [
        "Artificial intelligence is transforming the way we work and live. Machine learning algorithms can now process vast amounts of data to identify patterns and make predictions. This technology is being applied in healthcare, finance, transportation, and many other industries. While AI offers tremendous benefits, it also raises important questions about privacy, job displacement, and ethical considerations that society must address.",
        "Climate change is one of the most pressing challenges of our time. Rising global temperatures are causing ice caps to melt, sea levels to rise, and weather patterns to become more extreme. Scientists agree that human activities, particularly the burning of fossil fuels, are the primary cause of these changes. Immediate action is needed to reduce greenhouse gas emissions and transition to renewable energy sources.",
        "The Internet has revolutionized communication and information sharing. Social media platforms connect billions of people worldwide, enabling instant communication and the rapid spread of information. However, this connectivity also brings challenges such as misinformation, privacy concerns, and the potential for online harassment. Digital literacy has become essential for navigating this complex online landscape."
    ];

    // Add a demo button for quick testing
    const demoBtn = document.createElement('button');
    demoBtn.innerHTML = '<i class="fas fa-play"></i> Try Demo';
    demoBtn.className = 'action-btn';
    demoBtn.style.marginLeft = 'auto';
    demoBtn.addEventListener('click', function() {
        const randomText = sampleTexts[Math.floor(Math.random() * sampleTexts.length)];
        textInput.value = randomText;
        textInput.dispatchEvent(new Event('input'));
        textInput.focus();
    });

    // Add demo button to input controls
    const inputControls = document.querySelector('.input-controls');
    inputControls.appendChild(demoBtn);

    // Initial state
    summarizeBtn.disabled = true;
});

