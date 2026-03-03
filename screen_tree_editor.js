$(function() {
    // Initialize jsTree
    $('#screen-tree').jstree({
        'core': {
            'data': loadTreeData(),
            'check_callback': true
        },
        'plugins': ['dnd', 'contextmenu'],
        'contextmenu': {
            'items': function(node) {
                return {
                    'Copy': {
                        'label': 'Copy',
                        'action': function(data) {
                            var inst = $.jstree.reference(data.reference);
                            var obj = inst.get_node(data.reference);
                            inst.copy(obj);
                        }
                    },
                    'Cut': {
                        'label': 'Cut',
                        'action': function(data) {
                            var inst = $.jstree.reference(data.reference);
                            var obj = inst.get_node(data.reference);
                            inst.cut(obj);
                        }
                    },
                    'Paste': {
                        'label': 'Paste',
                        'action': function(data) {
                            var inst = $.jstree.reference(data.reference);
                            var obj = inst.get_node(data.reference);
                            inst.paste(obj);
                        }
                    },
                    'Add': {
                        'label': 'Add Screen',
                        'action': function(data) {
                            var inst = $.jstree.reference(data.reference);
                            var obj = inst.get_node(data.reference);
                            var newNode = inst.create_node(obj, { 'text': 'New Screen', 'data': { 'via': { 'status': 'missing', 'notes': '' }, 'mock-via': { 'status': 'missing', 'notes': '' } } });
                            inst.edit(newNode);
                        }
                    },
                    'Delete': {
                        'label': 'Delete',
                        'action': function(data) {
                            var inst = $.jstree.reference(data.reference);
                            var obj = inst.get_node(data.reference);
                            if(confirm('Are you sure you want to delete this screen?')) {
                                inst.delete_node(obj);
                            }
                        }
                    },
                    'Edit': {
                        'label': 'Edit Details',
                        'action': function(data) {
                            var inst = $.jstree.reference(data.reference);
                            var obj = inst.get_node(data.reference);
                            openEditDialog(obj);
                        }
                    }
                };
            }
        }
    });

    // Handle environment toggle
    $('#environment').on('change', function() {
        refreshTreeView();
    });

    // Handle AI analysis
    $('#analyze').on('click', function() {
        analyzeScreens();
    });

    // Handle AI recommendations
    $('#recommend').on('click', function() {
        getRecommendations();
    });

    // Save data on tree changes
    $('#screen-tree').on('changed.jstree', function(e, data) {
        saveTreeData();
    });

    function loadTreeData() {
        var data = localStorage.getItem('screenTreeData');
        if(data) {
            return JSON.parse(data);
        } else {
            // Default data structure if no saved data exists
            return [
                { 'text': 'Root', 'children': [
                    { 'text': 'Home', 'data': { 'via': { 'status': 'complete', 'notes': 'Fully implemented' }, 'mock-via': { 'status': 'complete', 'notes': 'HTML prototype done' } } },
                    { 'text': 'Settings', 'data': { 'via': { 'status': 'in-progress', 'notes': 'Working on UI' }, 'mock-via': { 'status': 'complete', 'notes': 'HTML prototype done' } } },
                    { 'text': 'Profile', 'data': { 'via': { 'status': 'missing', 'notes': 'Not started' }, 'mock-via': { 'status': 'in-progress', 'notes': 'Partial HTML' } } }
                ] }
            ];
        }
    }

    function saveTreeData() {
        var treeData = $('#screen-tree').jstree(true).get_json('#', { flat: false });
        localStorage.setItem('screenTreeData', JSON.stringify(treeData));
    }

    function refreshTreeView() {
        var env = $('#environment').val();
        var tree = $('#screen-tree').jstree(true);
        tree.refresh();
        // Additional logic to show environment-specific data can be added here
    }

    function openEditDialog(node) {
        var env = $('#environment').val();
        var status = node.data[env].status;
        var notes = node.data[env].notes;
        var newStatus = prompt('Enter status (complete, in-progress, missing):', status);
        var newNotes = prompt('Enter notes:', notes);
        if(newStatus && newNotes) {
            node.data[env].status = newStatus;
            node.data[env].notes = newNotes;
            saveTreeData();
            refreshTreeView();
        }
    }

    function analyzeScreens() {
        alert('Analysis Bot is running...');
        // Placeholder for AI analysis logic
        // This would send the current tree data to an AI endpoint for analysis
        // and display the results in a report format
        setTimeout(function() {
            alert('Analysis Complete: 1 screen missing in Via, 0 in Mock-Via.');
        }, 2000);
    }

    function getRecommendations() {
        alert('Recommendation Bot is running...');
        // Placeholder for AI recommendation logic
        // This would send the current tree data to an AI endpoint for recommendations
        // and display the suggestions
        setTimeout(function() {
            alert('Recommendation: Prioritize completing the Profile screen in Via.');
        }, 2000);
    }
});