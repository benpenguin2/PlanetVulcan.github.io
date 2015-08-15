require 'fileutils'
$stdout.sync = true
GH_PAGES_DIR = "compiled_site"


def run(command)
  IO.popen(command) do |io|
    while (line = io.gets) do
      puts line
    end
  end
end

desc "Build Jekyll site and copy files"
task :build do
  puts "Removing previous compiled pages."
  begin
    FileUtils.rm_r GH_PAGES_DIR
  rescue Errno::ENOENT
    puts "Already removed"
  end
  
	Dir.chdir 'jekyll_site'
	run 'jekyll build'
	Dir.chdir '..'
  
	puts "Creating .nojekyll file."
	FileUtils.touch "#{GH_PAGES_DIR}/.nojekyll"
	
	puts "Copying CNAME file"
	FileUtils.cp 'CNAME', GH_PAGES_DIR
	
	puts "Copying .gitignore file"
	FileUtils.cp '.gitignore', GH_PAGES_DIR
end

desc "Push compiled_site subtree to master"
task :push do
  run "git subtree push --prefix compiled_site/ origin master"
end

desc "Force push compiled_site subtree to master"
task :forcepush do
  command = "git push origin `git subtree split --prefix compiled_site/ master`:master --force"
  run "bash -c '#{command}'" 
end