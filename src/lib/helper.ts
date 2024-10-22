type TitleResult =
    | { success: true; title: string }
    | { success: false; error: string };

export function getMarkdownTitle(markdownContent: string): TitleResult {
    // Regular expression to match H1 title
    const h1Regex = /^# [A-Za-z0-9].*$/m;
    // const h1Regex = /^#\s*(.*)$/m;

    // Find the match
    const match = markdownContent.match(h1Regex);

    // If no match found, return error
    if (!match) {
        return { success: false, error: 'Title not found' };
    }

    // Extract the title, trim whitespace
    let title = match[0].trim().slice(2);

    // If title is empty after trimming, return error
    if (title.length === 0) {
        return { success: false, error: 'Title is empty' };
    }

    // Title should not exceed max length
    if (title.length >= 100) {
        return { success: false, error: 'Title should be under 100 characters' };
    }

    // Return success result with the title
    return { success: true, title };
}