require 'fileutils'
#require 'git'
$stdout.sync = true
GH_PAGES_DIR = "compiled_site"


def run(command)
  puts "$ #{command}"
  IO.popen(command) do |io|
    while (line = io.gets) do
      puts line
    end
  end
end

def run2(commands)
  commands.each do |c|
    puts "$ #{c}"
    IO.popen(['/bin/sh', '-c', c]) do |io|
      while (line = io.gets) do
        puts line
      end
    end
  end
end

desc "Travis Key"
task :travis_key do
  run 'openssl aes-256-cbc -K $encrypted_23e7d50fa7c4_key -iv $encrypted_23e7d50fa7c4_iv -in .travis/travis_rsa.enc -out .travis/travis_rsa -d'
  run 'chmod 600 .travis/travis_rsa'
  run 'ssh-add .travis/travis_rsa'
  run 'git remote add deploy git@github.com:PlanetVulcan/PlanetVulcan.github.io.git'
  
end

desc "Travis Git Env"
task :travis_git_env do
  a = Array.new
  
  #a.push 'export TRAVIS_COMMIT_MSG="$(git log --format=%B --no-merges -n 1)"'
  #a.push 'export TRAVIS_COMMIT_SHA1="$(git log --pretty=format:\'%h\' -n 1)"'
  
  # Fix Branch Head
  a.push 'git checkout source'
  a.push "git reset --hard '#{ENV["TRAVIS_COMMIT_SHA1"]}'"
  # Git Names
  a.push 'git config user.name "Travis CI - Planet Vulcan Robotics"'
  a.push 'git config user.email "info@planetvulcanrobotics.com"'
  
  run2 a
end

desc "Travis Git Commit"
task :travis_git_commit do
  # Git Commit
  run 'git add --all'
  run ['git', 'commit', '-m', "Travis Build: #{ENV["TRAVIS_COMMIT_MSG"]}"]
  
  # Git Push
  a = Array.new
  #a.push "git push deploy source"
  a.push "git subtree push --prefix compiled_site/ deploy master"
  
  run2 a
end

desc "Build Jekyll site and copy files."
task :build do
  puts "Removing previous compiled pages."
  begin
    FileUtils.rm_r GH_PAGES_DIR
  rescue Errno::ENOENT
    puts "Already removed."
  end
  
	Dir.chdir 'jekyll_site'
	run 'jekyll build'
	Dir.chdir '..'
  
	puts "Creating .nojekyll file."
	FileUtils.touch "#{GH_PAGES_DIR}/.nojekyll"
	
	puts "Copying CNAME file."
	FileUtils.cp 'CNAME', GH_PAGES_DIR
	
	puts "Copying .gitignore file."
	FileUtils.cp '.gitignore', GH_PAGES_DIR
end

desc "Serve Jekyll site for testing"
task :serve do
  puts "Serving."
	Dir.chdir 'jekyll_site'
	run 'jekyll serve'
	Dir.chdir '..'
end

desc "Push compiled_site subtree to master."
task :push do
  run "git subtree push --prefix compiled_site/ origin master"
  #g = Git.open(working_dir, :log => Logger.new(STDOUT))
end

desc "Force push compiled_site subtree to master."
task :forcepush do
  command = "git push origin `git subtree split --prefix compiled_site/ master`:master --force"
  run "bash -c '#{command}'" 
end