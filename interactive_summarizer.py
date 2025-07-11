
from summarizer import generate_summary

print("🔁 Micro Summary Generator (type 'exit' to stop)\n")
while True:
    user_input = input("📥 Enter a paragraph: ")

    if user_input.lower() == "exit":
        print("👋 Exiting the summary generator.")
        break
    summary = generate_summary(user_input)
    print("📝 Summary:", summary, "\n")


